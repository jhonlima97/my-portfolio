import { motion } from 'framer-motion';

interface Company {
  id: string;
  short: string;
  name: string;
  period: string;
  role: string;
  current?: boolean;
}

// Chronological: oldest -> current. Edit periods/roles here only.
const companies: Company[] = [
  {
    id: 'mpch',
    short: 'MPCH',
    name: 'Municipalidad Provincial de Chiclayo',
    period: '2022 – 2023',
    role: 'Practicante Pre Profesional',
  },
  {
    id: 'sunarp',
    short: 'SUNARP',
    name: 'Registros Públicos · Zona Registral II',
    period: '2023 – 2024',
    role: 'Practicante Profesional',
  },
  {
    id: 'grl',
    short: 'GRL',
    name: 'Gobierno Regional de Lambayeque',
    period: '2025',
    role: 'Documentador de procesos',
  },
  {
    id: 'uss',
    short: 'USS',
    name: 'Universidad Señor de Sipán',
    period: '2026 – Present',
    role: 'Analista Desarrollador',
    current: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 section-surface section-surface-1"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
            Experiencia
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Empresas en las que he trabajado
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Mi trayectoria profesional, de la primera a la actual
          </p>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex flex-col md:flex-row md:items-stretch gap-10 md:gap-6"
        >
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden
            className="absolute md:hidden left-5 top-2 bottom-2 w-px bg-linear-to-b from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600"
          />
          <span
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-5 h-px bg-linear-to-r from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600"
          />

          {companies.map((c) => (
            <motion.li
              key={c.id}
              variants={item}
              className="relative flex-1 flex md:flex-col gap-4 md:gap-0 pl-14 md:pl-0"
            >
              {/* Node */}
              <span
                className={`absolute left-0 md:static md:mx-auto flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-900 shrink-0 ${
                  c.current
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                }`}
              >
                <span className="relative text-xs font-bold">
                  {c.short.slice(0, 2)}
                </span>
              </span>

              {/* Card */}
              <div className="md:mt-6 md:text-center">
                <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                  {c.period}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {c.short}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {c.name}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {c.role}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
