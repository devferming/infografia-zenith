import { useState } from 'react';
import Icon from './Icon.jsx';
import { Cite, Reveal, SectionHead } from './UI.jsx';
import { COMPETENCIES } from '../data.js';
import { useApp } from '../hooks.js';

function Ring({ value }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r={r} className="ring-track" />
      <circle
        cx="60"
        cy="60"
        r={r}
        className="ring-fill"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
      />
    </svg>
  );
}

function mediation(v) {
  if (v < 20) return { tone: 'low', title: 'Tecnología ausente', text: 'Se pierden oportunidades de acceso, colaboración y nuevas formas de aprender.' };
  if (v <= 65) return { tone: 'ok', title: 'Apoya, no sustituye', text: 'La tecnología acompaña la interacción humana y responde a las necesidades de los estudiantes.' };
  if (v <= 85) return { tone: 'mid', title: 'Cuidado con el exceso', text: 'La pantalla empieza a ocupar el lugar del encuentro y del diálogo.' };
  return { tone: 'high', title: 'Tecnología que sustituye', text: 'La interacción humana se desplaza: justo lo que se busca evitar.' };
}

export default function Professional() {
  const [on, setOn] = useState({});
  const [mix, setMix] = useState(40);
  const { celebrate } = useApp();
  const count = COMPETENCIES.filter((c) => on[c.id]).length;
  const m = mediation(mix);

  const toggle = (id) =>
    setOn((s) => {
      const next = { ...s, [id]: !s[id] };
      if (COMPETENCIES.every((c) => next[c.id]) && !COMPETENCIES.every((c) => s[c.id])) celebrate();
      return next;
    });

  return (
    <section id="profesional" className="section">
      <SectionHead
        num="4"
        kicker="Rol del profesional"
        title="¿Cómo cambia el ejercicio profesional?"
        intro="Equipa a la profesional con las competencias que necesita y encuentra el punto justo entre tecnología e interacción humana."
        tone="blue"
      />

      <div className="pro-grid">
        <Reveal className="card pro-card">
          <div className="pro-top">
            <div className="ring-wrap">
              <Ring value={count / COMPETENCIES.length} />
              <div className="ring-center">
                <strong>{Math.round((count / COMPETENCIES.length) * 100)}%</strong>
                <small>preparada</small>
              </div>
            </div>
            <p className="pro-lead">
              Los profesionales necesitan actualizar competencias, evaluar críticamente la información y usar
              herramientas digitales con responsabilidad.
            </p>
          </div>
          <div className="comp-list">
            {COMPETENCIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`comp ${on[c.id] ? 'is-on' : ''}`}
                onClick={() => toggle(c.id)}
                aria-pressed={!!on[c.id]}
                style={{ '--i': i }}
              >
                <span className="comp-icon"><Icon name={c.icon} size={20} /></span>
                <span className="comp-text">
                  <strong>{c.label}</strong>
                  <small>{c.detail}</small>
                </span>
                <span className="comp-check"><Icon name="check" size={16} stroke={3} /></span>
              </button>
            ))}
          </div>
          <p className={`pro-status ${count === 3 ? 'is-done' : ''}`}>
            {count === 3 ? '¡Lista para un ejercicio profesional consciente!' : `Activa las ${COMPETENCIES.length - count} competencias restantes.`}
          </p>
        </Reveal>

        <Reveal delay={120} className={`card mix-card mix-${m.tone}`}>
          <h3>En educación, ¿cuánto debe mediar la tecnología?</h3>
          <div className="venn" style={{ '--mix': mix / 100 }} aria-hidden="true">
            <span className="venn-c venn-human">
              <Icon name="users" size={28} />
              <small>Interacción humana</small>
            </span>
            <span className="venn-c venn-tech">
              <Icon name="laptop" size={28} />
              <small>Tecnología</small>
            </span>
          </div>
          <label className="range-label" htmlFor="mix">
            <span>Menos tecnología</span>
            <span>Más tecnología</span>
          </label>
          <input
            id="mix"
            type="range"
            min="0"
            max="100"
            value={mix}
            onChange={(e) => setMix(Number(e.target.value))}
            className="range"
            style={{ '--v': `${mix}%` }}
            aria-valuetext={m.title}
          />
          <div className="mix-result" aria-live="polite">
            <strong>{m.title}</strong>
            <p>{m.text}</p>
          </div>
          <p className="mix-quote">
            “En educación, la tecnología debe <em>apoyar —no sustituir—</em> la interacción humana y responder a las
            necesidades de los estudiantes.”
          </p>
          <Cite ids={['zayed', 'unesco']} />
        </Reveal>
      </div>
    </section>
  );
}
