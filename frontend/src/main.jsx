import 'animate.css'
import './styles/global.css'
import { HelmetProvider } from "react-helmet-async";

import App from './App.jsx'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
)
