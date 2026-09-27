// Ícones próprios em traço fino (outline) — sem dependência externa.
// Para adicionar um ícone novo, inclua uma entrada em PATHS com o conteúdo do <svg> (viewBox 24×24).
const PATHS = {
  ceramic: (
    <>
      <path d="M12 3.5c-3.1 4.1-5.6 7.1-5.6 10.1a5.6 5.6 0 0 0 11.2 0c0-3-2.5-6-5.6-10.1Z" />
      <path d="M9.4 14.4a2.7 2.7 0 0 0 2.4 2.5" />
      <path d="M19 2.8v3.4M17.3 4.5h3.4" />
    </>
  ),
  polish: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.3a4.7 4.7 0 1 1-4.7 4.7" />
      <path d="M12 9.8a2.2 2.2 0 1 1-2.2 2.2" />
    </>
  ),
  ppf: (
    <>
      <path d="M12 3 19 6v5.4c0 4.5-3 7.9-7 9.6-4-1.7-7-5.1-7-9.6V6l7-3Z" />
      <path d="M8.4 5.8v5.6c0 2.9 1.4 5.3 3.6 6.8" opacity=".55" />
      <path d="m9.2 12.2 2 2 3.9-4" />
    </>
  ),
  wash: (
    <>
      <circle cx="8.5" cy="14.5" r="4.8" />
      <circle cx="16.2" cy="8.4" r="3.2" />
      <circle cx="17.4" cy="17.2" r="2.1" />
      <path d="M6.3 12.3a2.8 2.8 0 0 1 2-1" />
      <path d="M15 7.2a1.5 1.5 0 0 1 1-.5" />
    </>
  ),
  interior: (
    <>
      <path d="M8.1 3.5h4.2a1.6 1.6 0 0 1 1.6 1.7l-.6 8.3H7.6l-1-8.2a1.6 1.6 0 0 1 1.5-1.8Z" />
      <path d="M6.2 13.5h11.3a1.6 1.6 0 0 1 1.6 1.6v1.4H7" />
      <path d="M9 16.5v4M16.6 16.5v4" />
    </>
  ),
  wheel: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5.6" opacity=".5" />
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 10.2V3.6M13.7 11.4l6.3-2M12.9 13.6l3.9 5.3M11.1 13.6l-3.9 5.3M10.3 11.4 4 9.4" />
    </>
  ),
  warranty: (
    <>
      <circle cx="12" cy="9.5" r="5.8" />
      <path d="m8.6 14.3-1.4 6.7 4.8-2.4 4.8 2.4-1.4-6.7" />
      <path d="m9.7 9.6 1.5 1.5 3.1-3.1" />
    </>
  ),
  imported: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5s-1.2 5.9-3.6 8.5c-2.4-2.6-3.6-5.4-3.6-8.5S9.6 6.1 12 3.5ZM3.5 12h17" />
      <path d="M5 7.5h14M5 16.5h14" opacity=".5" />
    </>
  ),
  certified: (
    <>
      <path d="m12 2.8 2.2 1.6 2.7-.1.8 2.6 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-.8 2.6-2.7-.1L12 21.2l-2.2-1.6-2.7.1-.8-2.6-2.2-1.6.9-2.6-.9-2.6 2.2-1.6.8-2.6 2.7.1L12 2.8Z" />
      <path d="m8.8 12.1 2.2 2.2 4.3-4.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.6 2 2 4-4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.8a8.4 8.4 0 0 1-12.3 7.4l-4.7 1.3 1.3-4.5a8.4 8.4 0 1 1 15.7-4.2Z" />
      <path d="M9.1 8.1c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .6a6.6 6.6 0 0 0 2.4 2.4c.2.1.4.1.6 0l.6-.5c.2-.1.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.3-1.6.5-3-.1a9.5 9.5 0 0 1-4.4-4.4c-.6-1.4-.4-2.4 0-3.2Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  star: <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.6Z" />,
  quote: (
    <path d="M9.5 7.5C6.8 8.3 5 10.4 5 13.4V17h4.5v-4.5H7.2c0-1.6.9-2.8 2.3-3.4M18.5 7.5c-2.7.8-4.5 2.9-4.5 5.9V17h4.5v-4.5h-2.3c0-1.6.9-2.8 2.3-3.4" />
  ),
  arrowRight: <path d="M4.5 12h15m-5.5-5.5L19.5 12 14 17.5" />,
  arrowLeft: <path d="M19.5 12h-15m5.5-5.5L4.5 12l5.5 5.5" />,
  arrowDown: <path d="M12 4.5v15m-5.5-5.5 5.5 5.5 5.5-5.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  drag: <path d="M9 7.5 4.5 12 9 16.5M15 7.5l4.5 4.5-4.5 4.5" />,
}

export default function Icon({ name, size = 24, stroke = 1.25, className = '', filled = false, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
