import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

/**
 * EN/ES switch. Lives in the Header next to ThemeToggle, so it follows the
 * same inline-style pattern as that component.
 */
export default function LanguageToggle() {
  const { theme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.a11y.switchLanguage}
      title={t.a11y.switchLanguage}
      style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
        color: theme === 'dark' ? '#d1d5db' : '#374151',
        border: 'none',
        borderRadius: '9999px',
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        transition: 'background-color 0.2s',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M2 12h20M12 2c2.5 2.6 4 6.1 4 10s-1.5 7.4-4 10c-2.5-2.6-4-6.1-4-10s1.5-7.4 4-10z" />
      </svg>
      {lang === 'en' ? 'EN' : 'ES'}
    </button>
  );
}
