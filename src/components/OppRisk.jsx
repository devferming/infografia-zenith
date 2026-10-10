import { useState } from 'react';
import Icon from './Icon.jsx';
import { Cite, Reveal, SectionHead } from './UI.jsx';
import { OPPORTUNITIES, RISKS, UNESCO_CRITERIA } from '../data.js';
import { useApp } from '../hooks.js';

function verdict(o, r) {
  if (o === 0 && r === 0) return { tone: 'neutral', text: 'Toca oportunidades y riesgos para ponerlos en la balanza.' };
  if (o === r) return { tone: 'even', text: 'Equilibrio: aprovechar las posibilidades sin perder de vista lo que se arriesga.' };
  if (o > r)
    return {
      tone: 'good',
      text: r === 0 ? 'Solo oportunidades… ¿de verdad no hay nada que cuidar? Agrega algún riesgo.' : 'Las oportunidades pesan más, siempre que los riesgos se gestionen.',
    };
  return {
    tone: 'bad',
    text: o === 0 ? 'Solo riesgos… la tecnología también abre puertas. Agrega alguna oportunidad.' : 'Los riesgos pesan más: hace falta un uso más consciente.',
  };
}

function Chip({ item, on, kind, onClick }) {
  return (
    <button
      type="button"
      className={`chip chip-${kind} ${on ? 'is-on' : ''}`}
      onClick={onClick}
      aria-pressed={on}
    >
      <Icon name={item.icon} size={16} />
      <span>{item.text}</span>
      <span className="chip-state">{on ? '−' : '+'}</span>
    </button>
  );
}

export default function OppRisk() {
  const [sel, setSel] = useState({});
  const [criteria, setCriteria] = useState({});
  const { celebrate } = useApp();

  const opps = OPPORTUNITIES.filter((o) => sel[o.id]);
  const risks = RISKS.filter((r) => sel[r.id]);
  const angle = Math.max(-18, Math.min(18, (risks.length - opps.length) * 5));
  const v = verdict(opps.length, risks.length);
  const toggle = (id) => setSel((s) => ({ ...s, [id]: !s[id] }));
  const fillAll = () => {
    const next = {};
    [...OPPORTUNITIES, ...RISKS].forEach((x) => (next[x.id] = true));
    setSel(next);
  };

  const critCount = UNESCO_CRITERIA.filter((c) => criteria[c.id]).length;
  const toggleCrit = (id) => {
    setCriteria((c) => {
      const next = { ...c, [id]: !c[id] };
      if (UNESCO_CRITERIA.every((x) => next[x.id]) && !UNESCO_CRITERIA.every((x) => c[x.id])) celebrate();
      return next;
    });
  };

  return (
    <section id="oportunidades" className="section">
      <SectionHead
        num="3"
        kicker="La balanza digital"
        title="Oportunidades y riesgos"
        intro="Arma tu propia balanza: agrega lo que la tecnología ofrece y lo que pone en riesgo, y observa hacia dónde se inclina."
        tone="green"
      />

      <div className="balance-grid">
        <Reveal className="card list-card list-opp">
          <h3>
            <span className="badge badge-green"><Icon name="check" size={18} stroke={3} /></span> Oportunidades
          </h3>
          <div className="chips">
            {OPPORTUNITIES.map((o) => (
              <Chip key={o.id} item={o} kind="opp" on={!!sel[o.id]} onClick={() => toggle(o.id)} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="card balance-card">
          <div className="balance" style={{ '--angle': `${angle}deg` }}>
            <div className="beam">
              <div className="pan pan-left">
                <svg className="pan-strings" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0L4 60M50 0L96 60" /></svg>
                <div className="pan-dish">
                  {opps.map((o) => (
                    <span key={o.id} className="weight w-opp" title={o.text}>
                      <Icon name={o.icon} size={14} />
                    </span>
                  ))}
                </div>
                <span className="pan-label">{opps.length}</span>
              </div>
              <div className="pan pan-right">
                <svg className="pan-strings" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0L4 60M50 0L96 60" /></svg>
                <div className="pan-dish">
                  {risks.map((r) => (
                    <span key={r.id} className="weight w-risk" title={r.text}>
                      <Icon name={r.icon} size={14} />
                    </span>
                  ))}
                </div>
                <span className="pan-label">{risks.length}</span>
              </div>
            </div>
            <div className="pillar" />
            <div className="base" />
          </div>
          <p className={`verdict v-${v.tone}`} aria-live="polite">{v.text}</p>
          <div className="balance-actions">
            <button type="button" className="btn btn-soft" onClick={fillAll}>Agregar todo</button>
            <button type="button" className="btn btn-soft" onClick={() => setSel({})}>
              <Icon name="refresh" size={16} /> Vaciar
            </button>
          </div>
        </Reveal>

        <Reveal delay={200} className="card list-card list-risk">
          <h3>
            <span className="badge badge-red"><Icon name="alert" size={18} stroke={2.4} /></span> Riesgos
          </h3>
          <div className="chips">
            {RISKS.map((r) => (
              <Chip key={r.id} item={r} kind="risk" on={!!sel[r.id]} onClick={() => toggle(r.id)} />
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="card unesco">
        <div className="unesco-head">
          <span className="unesco-icon"><Icon name="users" size={28} /></span>
          <div>
            <p className="unesco-quote">
              La tecnología <strong>no mejora automáticamente</strong> el aprendizaje: su uso debe ser pertinente,
              equitativo, sostenible y centrado en las personas.
            </p>
            <Cite ids={['unesco']} />
          </div>
        </div>
        <p className="unesco-task">
          Piensa en una herramienta digital que uses para aprender. ¿Cumple estos criterios? Márcalos:
        </p>
        <div className="criteria">
          {UNESCO_CRITERIA.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`criterion ${criteria[c.id] ? 'is-on' : ''}`}
              onClick={() => toggleCrit(c.id)}
              aria-pressed={!!criteria[c.id]}
            >
              <span className="crit-box"><Icon name="check" size={16} stroke={3} /></span>
              <span className="crit-text">
                <strong>{c.label}</strong>
                <small>{c.hint}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={critCount}>
          <span style={{ width: `${(critCount / 4) * 100}%` }} />
        </div>
        <p className="meter-label">
          {critCount === 4
            ? '¡Uso con sentido! Esta herramienta suma al aprendizaje.'
            : critCount === 0
            ? 'Aún sin evaluar.'
            : `${critCount} de 4 criterios: hay aspectos por mejorar.`}
        </p>
      </Reveal>
    </section>
  );
}
