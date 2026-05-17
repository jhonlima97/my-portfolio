import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#f9fafb' : '#111827';
  const textSecondary = theme === 'dark' ? '#9ca3af' : '#4b5563';

  return (
    <section id="about" className="section-surface section-surface-2" style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '300px', margin: '0 auto', width: '100%' }}>
          <div style={{ aspectRatio: '3/4', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)' }}>
            <img src="/Photo.png" alt="Jhon Wayler Lima Camizan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '6px 16px', marginBottom: '12px', fontSize: '12px', fontWeight: 600, borderRadius: '9999px', backgroundColor: theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : '#e0e7ff', color: theme === 'dark' ? '#818cf8' : '#4f46e5', letterSpacing: '1px' }}>
              ABOUT ME
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: textColor, marginBottom: '4px' }}>
              Jhon Wayler Lima Camizan
            </h2>
            <p style={{ fontSize: '16px', color: theme === 'dark' ? '#818cf8' : '#6366f1', fontWeight: 500 }}>
              Full Stack Developer
            </p>
          </div>

          <p style={{ fontSize: '16px', color: textSecondary, lineHeight: 1.7 }}>
            Passionate Full Stack Developer with experience building modern web applications. 
            I love creating performant, accessible, and beautiful digital experiences that solve real-world problems.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <a
              href="#contact"
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                backgroundColor: '#6366f1',
                color: '#fff',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              Hire Me
            </a>
            <a
              href="/CV.pdf"
              target="_blank"
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                backgroundColor: '#6366f1',
                color: '#fff',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}