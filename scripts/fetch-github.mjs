/**
 * Fetches ALL repositories for the authenticated GitHub user
 * Usage:  npm run fetch:github
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = resolve(ROOT, 'src/data/github-repos.json');

/** Minimal .env loader (no extra dependency). Only reads GITHUB_TOKEN. */
function readToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();
  try {
    const env = readFileSync(resolve(ROOT, '.env'), 'utf8');
    for (const line of env.split('\n')) {
      const m = line.match(/^\s*GITHUB_TOKEN\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '').trim();
    }
  } catch {
    /* .env may not exist in CI; fall through */
  }
  return null;
}

async function main() {
  const token = readToken();
  if (!token) {
    console.error(
      '\n✖ GITHUB_TOKEN not found.\n' +
        '  Add this line to your .env (NOT prefixed with VITE_):\n' +
        '    GITHUB_TOKEN=your_read_only_token\n'
    );
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  async function gh(url) {
    const res = await fetch(url, { headers });
    if (res.status === 401) {
      console.error('\n✖ 401 Unauthorized — the token is invalid or expired.\n');
      process.exit(1);
    }
    if (!res.ok) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      console.error(
        `\n✖ GitHub API error ${res.status}` +
          (remaining === '0' ? ' (rate limit exhausted)' : '') +
          `\n${await res.text()}\n`
      );
      process.exit(1);
    }
    return res.json();
  }

  // affiliation=owner -> only YOUR repos (not collaborator/org noise).
  const raw = [];
  let page = 1;
  for (;;) {
    const batch = await gh(
      `https://api.github.com/user/repos` +
        `?per_page=100&page=${page}&visibility=all&affiliation=owner&sort=updated`
    );
    raw.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  // Filtramos los repos que no son proyectos
  const EXCLUDED = new Set(
    [
      'my-portfolio',
      'introduction-to-codeql',
      'skills-introduction-to-codeql',
      'Trabajos-D-WEB',
      'InscripcionVirtualApi',
      'datasets_gore',
      'pruebatecnica',
    ].map((name) => name.toLowerCase())
  );
  const projects = raw.filter(
    (r) =>
      r.name.toLowerCase() !== r.owner.login.toLowerCase() &&
      !EXCLUDED.has(r.name.toLowerCase())
  );

  /**
   * Top-3 language NAMES for one repo, ordered by bytes
   */
  async function topLanguages(fullName) {
    const bytes = await gh(`https://api.github.com/repos/${fullName}/languages`);
    return Object.entries(bytes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([nombre]) => nombre);
  }

  // Slim, non-sensitive shape. You classify these by company yourself later.
  const repos = [];
  for (const r of projects) {
    repos.push({
      nombre: r.name,
      link: r.clone_url,
      tipo: r.private ? 'Private' : 'Public',
      lenguajes: await topLanguages(r.full_name),
      anioCreacion: new Date(r.created_at).getFullYear(),
    });
  }

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(repos, null, 2) + '\n', 'utf8');

  const priv = repos.filter((r) => r.tipo === 'Private').length;
  console.log(
    `\n✓ Saved ${repos.length} repos (${priv} private) -> src/data/github-repos.json\n`
  );
}

main().catch((err) => {
  console.error('\n✖ Unexpected error:', err);
  process.exit(1);
});
