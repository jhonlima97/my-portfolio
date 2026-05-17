import { motion } from 'framer-motion';

// Sample projects, grouped by company internally (reused later for GitHub data)
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

const allProjects = Object.values(projects).flat();

export default function Projects() {
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {allProjects.map((project) => (
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