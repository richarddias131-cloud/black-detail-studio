import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Mesmas fontes e estilos do site principal
import '@fontsource/anton/latin-400.css'
import '@fontsource-variable/manrope/wght.css'
import Bio from './bio/Bio.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bio />
  </StrictMode>,
)
