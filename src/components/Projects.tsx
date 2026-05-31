import { motion } from 'framer-motion';
import githubRepos from '../data/github-repos.json';

// Shape of each entry in src/data/github-repos.json (see scripts/fetch-github.mjs).
interface GithubRepo {
  nombre: string;
  link: string;
  tipo: 'Public' | 'Private';
  lenguaje: string | null;
  anioCreacion: number;
}

// Repos hidden from the section (redundant, learning sandboxes, or a back-end
// already represented by its front-end). Add names here to keep refining.
const EXCLUDED = new Set<string>([
  'pdf-to-img',                 // learning sandbox for PDF processing, not a portfolio piece
  'api-ministros',              // back-end of portal-peru, not needed on its own
]);

// Source of truth: drop the excluded repos, then show the first 12.
const projects = (githubRepos as GithubRepo[])
  .filter((repo) => !EXCLUDED.has(repo.nombre))
  .slice(0, 12);

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
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover my work across different organizations
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
            // Modificar luego
            const description = `${repo.lenguaje ?? 'Code'} repository created in ${repo.anioCreacion}.`;

            return (
              <motion.article
                key={repo.nombre}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col h-full bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/no-image.png"
                    alt={repo.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ring-1 ${
                      isPublic
                        ? 'bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400 dark:text-emerald-950 dark:ring-emerald-300/30'
                        : 'bg-rose-100 text-rose-700 ring-rose-600/20 dark:bg-rose-400 dark:text-rose-950 dark:ring-rose-300/30'
                    }`}
                  >
                    {repo.tipo}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 wrap-break-words">
                    {repo.nombre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {description}
                  </p>

                  <div className="mt-auto">
                    {isPublic ? (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        aria-label="Repositorio privado — sin acceso público"
                        className="inline-flex items-center text-gray-400 dark:text-gray-500 font-medium cursor-not-allowed"
                      >
                        Acceso restringido
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </button>
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
