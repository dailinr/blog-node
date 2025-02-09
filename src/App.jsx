import './App.css';
import { Rutas } from './routing/rutas';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  )
}

export default App;
