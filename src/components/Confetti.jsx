import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const COLORS = ['#2f5bea', '#7c5cf0', '#22b07d', '#ffc23d', '#ff5d73', '#21b6d6'];

const Confetti = forwardRef(function Confetti(_, ref) {
  const canvasRef = useRef(null);
  const parts = useRef([]);
  const raf = useRef(0);

  const loop = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    parts.current = parts.current.filter((p) => p.y < c.height + 40 && p.life > 0);
    parts.current.forEach((p) => {
      p.vy += 0.18 * p.dpr;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 0) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else {
        ctx.beginPath();
        ctx.arc(0, 0, p.s / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (parts.current.length) raf.current = requestAnimationFrame(loop);
  };

  useImperativeHandle(ref, () => ({
    fire() {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      for (let i = 0; i < 140; i++) {
        const fromLeft = i % 2 === 0;
        parts.current.push({
          x: fromLeft ? 0 : c.width,
          y: c.height * 0.7,
          vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 9) * dpr,
          vy: -(8 + Math.random() * 10) * dpr,
          s: (6 + Math.random() * 8) * dpr,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.4,
          color: COLORS[i % COLORS.length],
          shape: i % 3 === 0 ? 1 : 0,
          life: 260,
          dpr,
        });
      }
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(loop);
    },
  }));

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />;
});

export default Confetti;
