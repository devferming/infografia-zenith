import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import WhatAre from './components/WhatAre.jsx';
import Transformations from './components/Transformations.jsx';
import OppRisk from './components/OppRisk.jsx';
import Professional from './components/Professional.jsx';
import Conclusion from './components/Conclusion.jsx';
import Quiz from './components/Quiz.jsx';
import Footer from './components/Footer.jsx';
import Confetti from './components/Confetti.jsx';
import Icon from './components/Icon.jsx';
import { AUTHORS } from './data.js';
import { AppContext, useStoredState } from './hooks.js';

function initialTheme() {
  try {
    const saved = window.localStorage.getItem('infografia.theme');
    if (saved) return JSON.parse(saved);
  } catch {
    /* ignore */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useStoredState('infografia.theme', initialTheme());
  const [author, setAuthor] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const confettiRef = useRef(null);
  const glowRef = useRef(null);
  const toastTimer = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Cursor spotlight (desktop only)
  useEffect(() => {
    const el = glowRef.current;
    if (!el || !window.matchMedia?.('(pointer: fine)').matches) return;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = '1';
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // Escape clears the author highlight
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setAuthor(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toast = useCallback((text, icon = 'spark') => {
    clearTimeout(toastTimer.current);
    setToastMsg({ text, icon, k: Date.now() });
    toastTimer.current = setTimeout(() => setToastMsg(null), 3800);
  }, []);

  const celebrate = useCallback(() => confettiRef.current?.fire(), []);

  const ctx = useMemo(() => ({ author, setAuthor, toast, celebrate }), [author, toast, celebrate]);

  return (
    <AppContext.Provider value={ctx}>
      <div className={`app ${author ? 'has-author' : ''}`}>
        <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
        <a className="skip" href="#que-son">Saltar al contenido</a>
        <Nav theme={theme} setTheme={setTheme} />
        <Hero />
        <main>
          <WhatAre />
          <Transformations />
          <OppRisk />
          <Professional />
          <Conclusion />
          <Quiz />
        </main>
        <Footer />

        {author && (
          <div className="author-bar" role="status">
            <Icon name="book" size={16} />
            <span>
              <span className="hide-sm">Resaltando citas de </span>
              <strong>{AUTHORS[author].name} ({AUTHORS[author].year})</strong>
            </span>
            <button type="button" onClick={() => setAuthor(null)} aria-label="Quitar resaltado">
              <Icon name="x" size={16} />
            </button>
          </div>
        )}

        {toastMsg && (
          <div className="toast" key={toastMsg.k} role="status">
            <span className="toast-icon">
              <Icon name={toastMsg.icon} size={18} />
            </span>
            <span>{toastMsg.text}</span>
          </div>
        )}

        <Confetti ref={confettiRef} />
      </div>
    </AppContext.Provider>
  );
}
