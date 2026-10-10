import Icon from './Icon.jsx';
import { AUTHORS } from '../data.js';
import { useApp } from '../hooks.js';

export default function Footer() {
  const { author, setAuthor } = useApp();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h2 className="footer-title">Fuentes citadas</h2>
          <p className="footer-help">Toca una fuente para resaltar en toda la página dónde se cita.</p>
          <div className="sources">
            {Object.entries(AUTHORS).map(([id, a]) => (
              <button
                key={id}
                type="button"
                className={`source ${author === id ? 'is-on' : ''}`}
                onClick={() => setAuthor(author === id ? null : id)}
                aria-pressed={author === id}
              >
                <Icon name="book" size={18} />
                <span>
                  <strong>{a.name}</strong> ({a.year})
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="footer-end">
          <p>Comprendiendo las prácticas emergentes contemporáneas del ser humano y la tecnología.</p>
          <a href="#inicio" className="btn btn-ghost">
            <Icon name="arrowUp" size={16} /> Volver al inicio
          </a>
        </div>
      </div>
    </footer>
  );
}
