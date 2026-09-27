import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fontes hospedadas no próprio site (sem requisição bloqueante ao Google Fonts).
// TROCAR FONTES: instale outro pacote @fontsource e atualize tailwind.config.js → fontFamily
import '@fontsource/anton/latin-400.css'
import '@fontsource-variable/manrope/wght.css'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
