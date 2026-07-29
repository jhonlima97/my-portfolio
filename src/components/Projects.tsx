import { motion } from 'framer-motion';
import githubRepos from '../data/github-repos.json';
import { useLanguage } from '../context/LanguageContext';
import { PROJECT_META } from '../data/projectMeta';
import ProjectCover from './ProjectCover';

// Shape of each entry in src/data/github-repos.json (see scripts/fetch-github.mjs).
interface GithubRepo {
  nombre: string;
  link: string;
  tipo: 'Public' | 'Private';
  /** Legacy field from older JSON; lenguajes[0] is the primary language now. */
  lenguaje?: string | null;
  /** Top 3 by bytes. New format: names only. Old format ({nombre, porcentaje}) still tolerated. */
  lenguajes?: (string | { nombre: string; porcentaje?: number })[];
  anioCreacion: number;
}

// Official GitHub language colors (subset). Fallback: gray.
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
  'C#': '#178600',
  'ASP.NET': '#9400ff',
  Python: '#3572A5',
  PHP: '#4F5D95',
  Java: '#b07219',
  Vue: '#41b883',
  Handlebars: '#f7931e',
  'Jupyter Notebook': '#DA5B0B',
  Blade: '#f7523f',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

const languageColor = (name: string) => LANGUAGE_COLORS[name] ?? '#8b949e';

// Short identifiers shown on the chips (full name goes in the tooltip).
const LANGUAGE_SIGLAS: Record<string, string> = {
  JavaScript: 'JS',
  TypeScript: 'TS',
  Python: 'PY',
  'C#': 'C#',
  CSS: 'CSS',
  SCSS: 'SCSS',
  HTML: 'HTML',
  'ASP.NET': 'ASP',
  Handlebars: 'HBS',
  PHP: 'PHP',
  Java: 'JAVA',
  Vue: 'VUE',
  Shell: 'SH',
  Dockerfile: 'DKR',
  'Jupyter Notebook': 'NB',
};

const languageSigla = (name: string) => LANGUAGE_SIGLAS[name] ?? name.slice(0, 3).toUpperCase();

/** Top-3 language names; tolerates old JSON entries and falls back to the primary language. */
const repoLanguages = (repo: GithubRepo): string[] => {
  if (repo.lenguajes?.length) {
    return repo.lenguajes.slice(0, 3).map((l) => (typeof l === 'string' ? l : l.nombre));
  }
  return repo.lenguaje ? [repo.lenguaje] : [];
};

// Repos hidden from the section (redundant, learning sandboxes, or a back-end
// already represented by its front-end). Add names here to keep refining.
const EXCLUDED = new Set<string>([
  'pdf-to-img',                 // learning sandbox for PDF processing, not a portfolio piece
  'api-ministros',              // back-end of portal-peru, not needed on its own
  'pruebatecnica',              // technical test (also excluded in fetch-github.mjs)
]);

// Recruiters skim: cap the section at the 9 most recent projects.
const MAX_PROJECTS = 9;

/** Real project year: curated metadata wins over the repo's created_at. */
const projectYear = (repo: GithubRepo) => PROJECT_META[repo.nombre]?.anio ?? repo.anioCreacion;

// Source of truth: drop excluded repos, newest first (by real year), cap at 9.
const projects = (githubRepos as GithubRepo[])
  .filter((repo) => !EXCLUDED.has(repo.nombre))
  .sort((a, b) => projectYear(b) - projectYear(a))
  .slice(0, MAX_PROJECTS);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const { t, lang } = useLanguage();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 section-surface section-surface-2">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
            {t.projects.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((repo) => {
            const isPublic = repo.tipo === 'Public';
            // JSON stores clone URLs (….git); strip it so the link opens the web page.
            const repoUrl = repo.link.replace(/\.git$/, '');
            const meta = PROJECT_META[repo.nombre];
            // Curated metadata wins over what GitHub reports.
            const year = meta?.anio ?? repo.anioCreacion;
            const description = meta?.descripcion?.[lang] ?? t.projects.description(year);
            const etiqueta =
              meta?.etiqueta?.[lang] ??
              (meta?.categoria ? t.projects.categories[meta.categoria] : undefined);

            return (
              <motion.article
                key={repo.nombre}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col h-full bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="relative h-48 overflow-hidden">
                  <ProjectCover
                    nombre={repo.nombre}
                    etiqueta={etiqueta}
                    categoria={meta?.categoria}
                    imagen={meta?.imagen}
                    iniciales={meta?.iniciales}
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ring-1 ${
                      isPublic
                        ? 'bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400 dark:text-emerald-950 dark:ring-emerald-300/30'
                        : 'bg-rose-100 text-rose-700 ring-rose-600/20 dark:bg-rose-400 dark:text-rose-950 dark:ring-rose-300/30'
                    }`}
                  >
                    {isPublic ? t.projects.badgePublic : t.projects.badgePrivate}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 wrap-break-words">
                    {repo.nombre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {description}
                  </p>

                  {/* Top-3 languages: sigla + color dot; full name in tooltip */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repoLanguages(repo).map((name) => (
                      <span
                        key={name}
                        className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-600/60 text-gray-700 dark:text-gray-200 cursor-default"
                      >
                        <span
                          aria-hidden
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: languageColor(name) }}
                        />
                        {/* Screen readers get the full name; the sigla is decorative. */}
                        <span aria-hidden>{languageSigla(name)}</span>
                        <span className="sr-only">{name}</span>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-100 px-2 py-1 text-xs font-medium text-white dark:text-gray-900 opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100"
                        >
                          {name}
                        </span>
                      </span>
                    ))}
                  </div>

                  {/* Actions: same visual weight for both links, pushed to
                      opposite edges. "View Demo" only renders when projectMeta
                      declares a live URL. */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    {isPublic ? (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white dark:hover:border-indigo-500 transition-colors"
                      >
                        {t.projects.viewProject}
                      </a>
                    ) : (
                      <span
                        aria-label={t.projects.privateRepoAria}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      >
                        {t.projects.privateRepo}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </span>
                    )}

                    {meta?.demo && (
                      <a
                        href={meta.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white dark:hover:border-indigo-500 transition-colors"
                      >
                        {t.projects.viewDemo}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
