import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  // Dynamic: rolls over on its own every January 1st.
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {t.footer.rights}
          </p>
          {/* No social icons here: they already live in the "Follow Me" block
              of the Contact section, right above. */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Jhon Lima - {currentYear}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
