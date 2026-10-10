import Icon from './Icon.jsx';
import { SECTIONS } from '../data.js';
import { useActiveSection, useScrollProgress } from '../hooks.js';

export default function Nav({ theme, setTheme }) {
  const progress = useScrollProgress();
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <nav className="topbar" aria-label="Principal">
        <a href="#inicio" className="brand">
          <span className="brand-mark">
            <Icon name="spark" size={16} />
          </span>
          <span className="brand-text">Prácticas digitales</span>
        </a>
        <div className="topbar-actions">
          <span className="pct">{Math.round(progress * 100)}%</span>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
        </div>
      </nav>

      <nav className="dots" aria-label="Secciones">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`dot ${active === s.id ? 'is-on' : ''}`}
            aria-current={active === s.id ? 'true' : undefined}
          >
            <span className="dot-num">{s.num}</span>
            <span className="dot-label">{s.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
