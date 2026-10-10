import { useState } from 'react';
import Icon from './Icon.jsx';
import { Cite, Reveal, SectionHead } from './UI.jsx';
import { TRANSFORMATIONS } from '../data.js';
import { useTilt } from '../hooks.js';

function FlipCard({ t, flipped, onFlip, index }) {
  const tilt = useTilt(8);
  return (
    <Reveal delay={index * 90} className={`flip tone-${t.tone} ${flipped ? 'is-flipped' : ''}`}>
      <div className="flip-tilt tilt" {...tilt}>
        <div className="flip-inner">
          <div className="flip-face flip-front" aria-hidden={flipped}>
            <span className="tf-icon">
              <Icon name={t.icon} size={26} />
            </span>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            <Cite ids={t.cites} />
            <button type="button" className="flip-btn" onClick={onFlip} tabIndex={flipped ? -1 : 0}>
              Ver ejemplo <Icon name="refresh" size={16} />
            </button>
            <span className="shine" />
          </div>
          <div className="flip-face flip-back" aria-hidden={!flipped}>
            <p className="back-label">En la vida cotidiana</p>
            <p className="back-example">{t.back.example}</p>
            <p className="back-label">Para pensar</p>
            <p className="back-q">“{t.back.question}”</p>
            <button type="button" className="flip-btn" onClick={onFlip} tabIndex={flipped ? 0 : -1}>
              Volver <Icon name="refresh" size={16} />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Transformations() {
  const [flipped, setFlipped] = useState({});
  const allFlipped = TRANSFORMATIONS.every((t) => flipped[t.id]);
  const toggleAll = () => {
    const next = {};
    TRANSFORMATIONS.forEach((t) => (next[t.id] = !allFlipped));
    setFlipped(next);
  };

  return (
    <section id="transformaciones" className="section">
      <SectionHead
        num="2"
        kicker="Cuatro cambios clave"
        title="Transformaciones principales"
        intro="Cada tarjeta tiene dos caras: la idea y un ejemplo cotidiano con una pregunta para pensar. Gírala."
        tone="violet"
      />
      <div className="flip-toolbar">
        <button type="button" className="btn btn-soft" onClick={toggleAll}>
          <Icon name="refresh" size={16} /> {allFlipped ? 'Volver a las ideas' : 'Girar todas'}
        </button>
        <span className="counter">
          {Object.values(flipped).filter(Boolean).length}/{TRANSFORMATIONS.length} exploradas
        </span>
      </div>
      <div className="flip-grid">
        {TRANSFORMATIONS.map((t, i) => (
          <FlipCard
            key={t.id}
            t={t}
            index={i}
            flipped={!!flipped[t.id]}
            onFlip={() => setFlipped((f) => ({ ...f, [t.id]: !f[t.id] }))}
          />
        ))}
      </div>
    </section>
  );
}
