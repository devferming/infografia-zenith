import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { Cite, Reveal, SectionHead } from './UI.jsx';
import { PRACTICES } from '../data.js';
import { useInView, useTilt } from '../hooks.js';

function ChatScene({ practice }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const timers = practice.chat.map((_, i) => setTimeout(() => setShown(i + 1), 450 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, [practice]);

  return (
    <div className="chat" key={practice.id}>
      <div className="chat-top" style={{ '--c': practice.color }}>
        <span className="chat-avatar">
          <Icon name={practice.icon} size={16} />
        </span>
        <span>{practice.title}</span>
      </div>
      <div className="chat-body">
        {practice.chat.slice(0, shown).map((m, i) => (
          <p key={i} className={`bubble from-${m.from}`}>
            {m.text}
          </p>
        ))}
        {shown < practice.chat.length && (
          <p className={`bubble typing from-${practice.chat[shown].from}`} aria-label="escribiendo">
            <i />
            <i />
            <i />
          </p>
        )}
      </div>
    </div>
  );
}

export default function WhatAre() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const tilt = useTilt(12);

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % PRACTICES.length), 4200);
    return () => clearInterval(t);
  }, [auto, inView]);

  const pick = (i) => {
    setAuto(false);
    setIdx(i);
  };

  const p = PRACTICES[idx];

  return (
    <section id="que-son" className="section" ref={ref}>
      <SectionHead num="1" kicker="Definición" title="¿Qué son?" tone="blue" />

      <div className="what-grid">
        <Reveal className="card definition">
          <p className="definition-text">
            Son nuevas formas de{' '}
            {PRACTICES.map((pr, i) => (
              <span key={pr.id}>
                <button
                  type="button"
                  className={`keyword ${i === idx ? 'is-on' : ''}`}
                  style={{ '--c': pr.color }}
                  onClick={() => pick(i)}
                  aria-pressed={i === idx}
                >
                  {pr.word}
                </button>
                {i < PRACTICES.length - 2 ? ', ' : i === PRACTICES.length - 2 ? ' y ' : ''}
              </span>
            ))}
            , mediadas o transformadas por las tecnologías digitales.
          </p>
          <Cite ids={['cardenas', 'zayed']} />
          <p className="tip">
            <Icon name="spark" size={16} /> Toca cada palabra resaltada para verla en acción en el teléfono.
          </p>
          <div className="practice-tabs" role="tablist" aria-label="Prácticas">
            {PRACTICES.map((pr, i) => (
              <button
                key={pr.id}
                role="tab"
                aria-selected={i === idx}
                className={`ptab ${i === idx ? 'is-on' : ''}`}
                style={{ '--c': pr.color }}
                onClick={() => pick(i)}
              >
                <Icon name={pr.icon} size={18} />
                <span>{pr.word}</span>
                {auto && i === idx && <span className="ptab-timer" />}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="phone-wrap">
          <div className="phone tilt" {...tilt}>
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-status">
                <span>9:41</span>
                <span className="status-icons">
                  <Icon name="wifi" size={12} />
                </span>
              </div>
              <ChatScene practice={p} />
            </div>
            <span className="phone-glare" />
          </div>
          <div className="phone-floaters" aria-hidden="true">
            <span className="fl f1"><Icon name="globe" size={20} /></span>
            <span className="fl f2"><Icon name="wifi" size={20} /></span>
            <span className="fl f3"><Icon name="chat" size={20} /></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
