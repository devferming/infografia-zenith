import { useState } from 'react';
import Icon from './Icon.jsx';
import { Cite, Reveal, SectionHead } from './UI.jsx';
import { CHALLENGES, SELF_CHECK } from '../data.js';
import { useStoredState } from '../hooks.js';

const PILLARS = [
  { icon: 'user', label: 'la identidad' },
  { icon: 'users', label: 'las relaciones' },
  { icon: 'cap', label: 'la educación' },
];

function profile(score, answered) {
  if (answered < SELF_CHECK.length) return null;
  if (score >= 4)
    return { tone: 'good', title: 'Uso consciente', text: 'Decides tú, con criterio. Sigue cuidando ese equilibrio y compártelo con otros.' };
  if (score >= 2)
    return { tone: 'mid', title: 'En camino', text: 'Hay hábitos conscientes y otros en piloto automático. Elige uno para cambiar esta semana.' };
  return { tone: 'bad', title: 'Piloto automático', text: 'La tecnología está decidiendo más de lo que crees. Empieza por un momento diario sin pantallas.' };
}

export default function Conclusion() {
  const [openCh, setOpenCh] = useState(null);
  const [vote, setVote] = useStoredState('infografia.vote', null);
  const [answers, setAnswers] = useStoredState('infografia.selfcheck', {});

  const answered = SELF_CHECK.filter((s) => answers[s.id] != null).length;
  const score = SELF_CHECK.reduce((acc, s) => {
    const a = answers[s.id];
    if (a == null) return acc;
    return acc + ((s.reverse ? !a : a) ? 1 : 0);
  }, 0);
  const prof = profile(score, answered);

  return (
    <section id="conclusion" className="section">
      <SectionHead num="5" kicker="Cierre" title="Conclusión" tone="violet" />

      <div className="concl-grid">
        <Reveal className="card concl-card">
          <p className="concl-lead">Las prácticas digitales transforman</p>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <span key={p.label} className="pillar-item" style={{ '--i': i }}>
                <span className="pillar-icon"><Icon name={p.icon} size={24} /></span>
                {p.label}
              </span>
            ))}
          </div>
          <p className="concl-text">
            El reto es aprovechar sus posibilidades <strong>sin perder</strong>:
          </p>
          <div className="challenges">
            {CHALLENGES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`challenge ${openCh === c.id ? 'is-open' : ''}`}
                onClick={() => setOpenCh(openCh === c.id ? null : c.id)}
                aria-expanded={openCh === c.id}
              >
                <span className="ch-head">
                  <Icon name={c.icon} size={20} />
                  <strong>{c.label}</strong>
                  <span className="ch-plus">+</span>
                </span>
                <span className="ch-body">
                  <span>{c.text}</span>
                </span>
              </button>
            ))}
          </div>
          <Cite ids={['cardenas', 'hallgren']} />
        </Reveal>

        <Reveal delay={120} className="card reflect-card">
          <div className="reflect-head">
            <span className="mega"><Icon name="megaphone" size={26} /></span>
            <p className="kicker">Pregunta para reflexionar</p>
          </div>
          <p className="reflect-q">
            ¿Usamos la tecnología de forma consciente o dejamos que influya en nuestras decisiones sin cuestionarla?
          </p>
          <div className="vote" role="group" aria-label="Tu respuesta">
            <button
              type="button"
              className={`vote-btn ${vote === 'consciente' ? 'is-on' : ''}`}
              onClick={() => setVote('consciente')}
              aria-pressed={vote === 'consciente'}
            >
              <Icon name="brain" size={20} /> De forma consciente
            </button>
            <button
              type="button"
              className={`vote-btn ${vote === 'influye' ? 'is-on' : ''}`}
              onClick={() => setVote('influye')}
              aria-pressed={vote === 'influye'}
            >
              <Icon name="eye" size={20} /> Dejamos que influya
            </button>
          </div>
          {vote && (
            <p className="vote-echo">
              Elegiste <strong>{vote === 'consciente' ? '“de forma consciente”' : '“dejamos que influya”'}</strong>. Ahora
              ponlo a prueba con tus hábitos reales 👇
            </p>
          )}

          <div className="thermo-block">
            <h3>
              <Icon name="thermometer" size={20} /> Termómetro de uso consciente
            </h3>
            <ul className="selfcheck">
              {SELF_CHECK.map((s) => (
                <li key={s.id}>
                  <span>{s.text}</span>
                  <span className="yn">
                    <button
                      type="button"
                      className={answers[s.id] === true ? 'is-on' : ''}
                      onClick={() => setAnswers((a) => ({ ...a, [s.id]: true }))}
                      aria-pressed={answers[s.id] === true}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      className={answers[s.id] === false ? 'is-on' : ''}
                      onClick={() => setAnswers((a) => ({ ...a, [s.id]: false }))}
                      aria-pressed={answers[s.id] === false}
                    >
                      No
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <div className="thermo">
              <div className="thermo-bar">
                <span style={{ width: `${(score / SELF_CHECK.length) * 100}%` }} />
              </div>
              <span className="thermo-count">
                {answered}/{SELF_CHECK.length}
              </span>
            </div>
            {prof ? (
              <div className={`profile p-${prof.tone}`} aria-live="polite">
                <strong>{prof.title}</strong>
                <p>{prof.text}</p>
                <button type="button" className="link-btn" onClick={() => setAnswers({})}>
                  Repetir
                </button>
              </div>
            ) : (
              <p className="thermo-hint">Responde las {SELF_CHECK.length} afirmaciones para ver tu perfil. Tus respuestas solo quedan en este navegador.</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
