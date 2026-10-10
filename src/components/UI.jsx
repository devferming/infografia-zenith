import { AUTHORS } from '../data.js';
import { useApp, useInView } from '../hooks.js';

export function Cite({ ids }) {
  const { author, setAuthor } = useApp();
  return (
    <span className="cites">
      {ids.map((id) => (
        <button
          key={id}
          type="button"
          className={`cite ${author === id ? 'is-on' : ''} ${author && author !== id ? 'is-dim' : ''}`}
          onClick={() => setAuthor(author === id ? null : id)}
          title="Resaltar todas las citas de esta fuente"
        >
          {AUTHORS[id].short}
        </button>
      ))}
    </span>
  );
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...(rest.style || {}) }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ num, kicker, title, intro, tone = 'blue' }) {
  return (
    <Reveal className={`section-head tone-${tone}`}>
      <span className="section-num" aria-hidden="true">
        {num}
      </span>
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </Reveal>
  );
}
