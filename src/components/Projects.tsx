import { useState } from 'react';
import { motion } from 'framer-motion';

// Company data
const companies = [
  { id: 'uss', name: 'USS', title: 'Universidad Señor de Sipán', period: 'Current' },
  { id: 'grl', name: 'GRL', title: 'Gobierno Regional de Lambayeque', period: 'Recent' },
  { id: 'sunarp', name: 'SUNARP', title: 'Registros Públicos ZR II', period: 'Mid-term' },
  { id: 'usat', name: 'USAT', title: 'Época Estudiante Universitario', period: 'Past' }
];

// Sample projects (2 per company)
const projects = {
  uss: [
    { id: 1, title: 'Academic Management System', description: 'Full-featured academic management system built with React and Node.js', image: '/no-image.png' },
    { id: 2, title: 'Student Portal', description: 'Web platform for students with academic tracking features', image: '/no-image.png' }
  ],
  grl: [
    { id: 3, title: 'Digital Procedures System', description: 'Government procedures automation with database integration', image: '/no-image.png' },
    { id: 4, title: 'Indicators Dashboard', description: 'Control panel for regional indicators with dynamic charts', image: '/no-image.png' }
  ],
  sunarp: [
    { id: 5, title: 'Digital Property Registry', description: 'Property registration and inquiry system', image: '/no-image.png' },
    { id: 6, title: 'Public Registry Portal', description: 'Public registry inquiry platform with secure authentication', image: '/no-image.png' }
  ],
  usat: [
    { id: 7, title: 'Virtual Library', description: 'Digital library with advanced search and online loans', image: '/no-image.png' },
    { id: 8, title: 'Online Courses Platform', description: 'LMS for virtual courses with progress tracking', image: '/no-image.png' }
  ]
};

export default function Projects() {
  const [activeCompany, setActiveCompany] = useState('uss');

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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
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

        {/* Company filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => setActiveCompany(company.id)}
              title={company.title}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCompany === company.id
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {company.name}
            </button>
          ))}
        </div>

        {/* Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects[activeCompany as keyof typeof projects].map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}