import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useApp } from '../hooks.js';

const ORBIT = [
  { icon: 'wifi', label: 'Conexión', fact: 'Estar conectados cambia cuándo, dónde y cómo nos encontramos.' },
  { icon: 'chat', label: 'Mensajes', fact: 'La conversación ya no depende de compartir el mismo espacio.' },
  { icon: 'heart', label: 'Reacciones', fact: 'Las respuestas de otros influyen en cómo nos vemos.' },
  { icon: 'phone', label: 'Móvil', fact: 'El móvil se volvió aula, oficina, álbum y plaza pública.' },
  { icon: 'globe', label: 'Información', fact: 'Nunca tuvimos tanto acceso a información… ni tanta por filtrar.' },
  { icon: 'book', label: 'Aprender', fact: 'Aprender también ocurre en chats, foros y videos.' },
];

const TITLE = ['Comprendiendo', 'las', 'prácticas', 'emergentes', 'contemporáneas', 'del', 'ser', 'humano', 'y', 'la', 'tecnología'];
const HIGHLIGHT = new Set(['emergentes', 'tecnología']);

export function Person({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 220 220" aria-hidden="true">
      <ellipse cx="110" cy="200" rx="80" ry="10" fill="var(--shadow-ink)" />
      {/* hair back */}
      <path d="M62 92c-6-44 22-70 52-68 34 2 52 30 46 70-2 26 6 44 14 58H52c8-16 14-34 10-60z" fill="var(--hair)" />
      {/* body */}
      <path d="M50 200c2-40 26-62 60-62s58 22 60 62z" fill="var(--amber)" />
      <path d="M92 140l18 18 18-18" fill="none" stroke="var(--amber-deep)" strokeWidth="4" strokeLinecap="round" />
      {/* neck + face */}
      <rect x="99" y="112" width="22" height="26" rx="10" fill="var(--skin-deep)" />
      <ellipse cx="110" cy="88" rx="32" ry="36" fill="var(--skin)" />
      <path d="M78 80c6-26 26-34 44-30 16 4 26 16 22 34-14-4-26-12-34-24-6 10-18 18-32 20z" fill="var(--hair)" />
      <circle className="blink" cx="98" cy="92" r="3.4" fill="var(--ink)" />
      <circle className="blink" cx="122" cy="92" r="3.4" fill="var(--ink)" />
      <path d="M102 106c5 4 11 4 16 0" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="91" cy="102" r="5" fill="var(--rose)" opacity=".35" />
      <circle cx="129" cy="102" r="5" fill="var(--rose)" opacity=".35" />
      {/* laptop */}
      <path d="M44 168h132l-10 32H54z" fill="var(--laptop)" />
      <rect x="60" y="150" width="100" height="22" rx="4" fill="var(--laptop-hi)" />
      <path d="M104 158a6 6 0 0 1 12 0c0 6-6 9-6 9s-6-3-6-9z" fill="var(--rose)" className="pulse-heart" />
    </svg>
  );
}

export default function Hero() {
  const stageRef = useRef(null);
  const { toast } = useApp();
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--py', y.toFixed(3));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <header id="inicio" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="grid-dots" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot-live" /> Infografía interactiva
          </p>
          <h1 className="hero-title">
            {TITLE.map((w, i) => (
              <span key={i} className={`word ${HIGHLIGHT.has(w) ? 'hl' : ''}`} style={{ '--i': i }}>
                {w}{' '}
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            Transformaciones sociales, identidad digital, relaciones humanas y desafíos educativos.
          </p>
          <div className="hero-cta">
            <a href="#que-son" className="btn btn-primary">
              Comenzar el recorrido <Icon name="arrowDown" size={18} />
            </a>
            <a href="#reto" className="btn btn-ghost">
              Ir al reto final
            </a>
          </div>
          <ul className="hero-meta">
            <li><strong>5</strong> secciones</li>
            <li><strong>8</strong> interacciones</li>
            <li><strong>5</strong> preguntas de reto</li>
          </ul>
        </div>

        <div className="hero-stage" ref={stageRef}>
          <div className="orbit-ring r1" aria-hidden="true" />
          <div className="orbit-ring r2" aria-hidden="true" />
          <div className="orbit">
            {ORBIT.map((o, i) => (
              <button
                key={o.icon}
                type="button"
                className={`orbit-item ${picked === i ? 'is-on' : ''}`}
                style={{ '--a': `${(360 / ORBIT.length) * i}deg`, '--depth': (i % 3) + 1 }}
                onClick={() => {
                  setPicked(i);
                  toast(o.fact, o.icon);
                }}
                aria-label={`${o.label}: ${o.fact}`}
              >
                <span className="orbit-bubble">
                  <Icon name={o.icon} size={22} />
                </span>
              </button>
            ))}
          </div>
          <Person className="hero-person" />
          <p className="stage-hint">Toca los íconos que orbitan ✦</p>
        </div>
      </div>

      <a href="#que-son" className="scroll-cue" aria-label="Bajar a la sección 1">
        <span />
      </a>
    </header>
  );
}
