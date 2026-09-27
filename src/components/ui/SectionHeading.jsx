import Reveal from './Reveal'

// Cabeçalho padrão das seções: eyebrow com hairline vermelha + título condensado.
// `title` pode ser string ou array de linhas; a última linha pode ficar em vermelho com accentLast.
// size: 'lg' (padrão) | 'md' (para colunas estreitas)
export default function SectionHeading({ eyebrow, title, intro, align = 'left', accentLast = false, size = 'lg', className = '' }) {
  const lines = Array.isArray(title) ? title : [title]
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        <span className="rule-accent" />
        <span className="eyebrow">{eyebrow}</span>
        {center && <span className="rule-accent" />}
      </Reveal>
      <Reveal as="h2" delay={0.08} className={`mt-6 font-display uppercase text-bone ${size === 'md' ? 'text-display-md' : 'text-display-lg'}`}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${accentLast && i === lines.length - 1 ? 'text-accent' : ''}`}>
            {line}
          </span>
        ))}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={0.16} className={`mt-8 max-w-xl text-body-lg text-mist ${center ? 'mx-auto' : ''}`}>
          {intro}
        </Reveal>
      )}
    </div>
  )
}
