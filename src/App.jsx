import './App.css';
import { Rutas } from './routing/rutas';
import { useNavigate, BrowserRouter } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario no está autenticado, redirigir al login
    const token = localStorage.getItem("token"); // o usa tu sistema de autenticación
    if (!token) {
      navigate("/usuario/login");
    }
  }, []);

  return (
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  )
}

export default App;
