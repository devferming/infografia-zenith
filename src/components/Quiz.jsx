import { useState } from 'react';
import Icon from './Icon.jsx';
import { Reveal, SectionHead } from './UI.jsx';
import { QUIZ } from '../data.js';
import { useApp, useStoredState } from '../hooks.js';

export default function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [best, setBest] = useStoredState('infografia.best', 0);
  const { celebrate, toast } = useApp();

  const q = QUIZ[i];
  const answered = picked != null;

  const choose = (k) => {
    if (answered) return;
    setPicked(k);
    if (k === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 < QUIZ.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      setDone(true);
      if (score > best) setBest(score);
      if (score >= QUIZ.length - 1) celebrate();
    }
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const share = async () => {
    const text = `Obtuve ${score}/${QUIZ.length} en el reto de prácticas digitales emergentes.`;
    try {
      if (navigator.share) await navigator.share({ title: 'Prácticas digitales emergentes', text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        toast('Resultado copiado al portapapeles', 'share');
      }
    } catch {
      /* cancelled */
    }
  };

  const msg =
    score === QUIZ.length
      ? '¡Perfecto! Dominas las prácticas digitales emergentes.'
      : score >= 3
      ? '¡Muy bien! Tienes clara la idea central.'
      : 'Buen intento: repasa las secciones y vuelve a jugar.';

  return (
    <section id="reto" className="section">
      <SectionHead
        num="★"
        kicker="Pon a prueba lo aprendido"
        title="Reto final"
        intro={`${QUIZ.length} preguntas rápidas sobre la infografía.`}
        tone="amber"
      />
      <Reveal className="card quiz">
        {!done ? (
          <>
            <div className="quiz-top">
              <span className="quiz-step">
                Pregunta {i + 1} de {QUIZ.length}
              </span>
              <span className="quiz-score">
                <Icon name="trophy" size={16} /> {score}
              </span>
            </div>
            <div className="quiz-progress">
              {QUIZ.map((_, k) => (
                <span key={k} className={k < i ? 'is-done' : k === i ? 'is-now' : ''} />
              ))}
            </div>
            <h3 className="quiz-q" key={i}>
              {q.q}
            </h3>
            <div className="quiz-options">
              {q.options.map((o, k) => {
                const state = !answered ? '' : k === q.answer ? 'is-right' : k === picked ? 'is-wrong' : 'is-faded';
                return (
                  <button
                    key={k}
                    type="button"
                    className={`opt ${state}`}
                    onClick={() => choose(k)}
                    disabled={answered}
                    style={{ '--i': k }}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + k)}</span>
                    <span>{o}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`quiz-feedback ${picked === q.answer ? 'ok' : 'ko'}`} aria-live="polite">
                <strong>{picked === q.answer ? '¡Correcto!' : 'No exactamente.'}</strong> {q.why}
                <button type="button" className="btn btn-primary" onClick={next}>
                  {i + 1 < QUIZ.length ? 'Siguiente' : 'Ver resultado'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="quiz-done">
            <div className="score-big">
              <span>{score}</span>/{QUIZ.length}
            </div>
            <p className="score-msg">{msg}</p>
            <p className="score-best">Tu mejor marca: {Math.max(best, score)}/{QUIZ.length}</p>
            <div className="quiz-actions">
              <button type="button" className="btn btn-primary" onClick={restart}>
                <Icon name="refresh" size={16} /> Jugar de nuevo
              </button>
              <button type="button" className="btn btn-soft" onClick={share}>
                <Icon name="share" size={16} /> Compartir
              </button>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
