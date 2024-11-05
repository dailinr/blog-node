import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { ArticulosProvider } from './helpers/ArticulosContext.jsx';

// Configuracion react-time-ago
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es.json'; // idioma español

TimeAgo.addDefaultLocale(es); // localizacion por defecto
TimeAgo.addLocale(es); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <ArticulosProvider>
    <App />
  </ArticulosProvider>
)
