# Jhon Lima — Portfolio

Personal single-page portfolio. Live sections: Hero, About, Experience, Projects (auto-generated from my GitHub repos), and Contact.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Framer Motion · EmailJS

**Features:**

- Dark/light theme with no-FOUC inline script and `prefers-color-scheme` support.
- English/Spanish toggle (custom typed i18n context, zero dependencies).
- Projects fed by a build-time script that pulls my repos from the GitHub API, including top-3 languages per repo.
- Contact form via EmailJS.

## Scripts

| Command                | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Vite dev server with HMR                                 |
| `npm run build`        | Type-check (`tsc -b`) + production build                 |
| `npm run lint`         | ESLint                                                   |
| `npm run preview`      | Serve the production build                               |
| `npm run fetch:github` | Regenerate `src/data/github-repos.json` from GitHub API  |

## Environment variables (`.env`, not committed)

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
GITHUB_TOKEN=...   # read-only, used only by scripts/fetch-github.mjs (never shipped to the client)
```

## Deploy (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes it to <https://jhonlima97.github.io/my-portfolio/>.

One-time setup in the repo:

1. **Settings → Pages → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions**, add three repository secrets:
   `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
   Vite inlines them at build time, so without them the contact form fails silently.

`vite.config.ts` sets `base: '/my-portfolio/'` to match the repo name. Anything in
`public/` must therefore be referenced with `import.meta.env.BASE_URL`, never with a
bare leading `/`. If the site ever moves to a custom domain, set `base` back to `'/'`.

## Contact

- LinkedIn: [ingjhonlima20](https://www.linkedin.com/in/ingjhonlima20/)
- Blog: [jsmithfsdeveloper.blogspot.com](https://jsmithfsdeveloper.blogspot.com/)
- Email: jhonw.lima08@gmail.com
