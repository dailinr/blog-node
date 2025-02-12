import React, { useState, useEffect } from 'react';
import '../../css/Inicio.css';
import Portada from '../layouts/Portada.jsx';
import Articulos from './Articulos.jsx';
import ArticulosLateral from '../layouts/ArticulosLateral.jsx';
import CrearArticulo from './CrearArticulo.jsx';
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
 

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const InicioNoAuth = () => {
    const [btnCrear, setBtnCrear] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Permitir acceso sin autenticación solo a estas rutas
        const rutasPublicas = ["/usuario/login", "/usuario/registrar-cuenta", "/home"];

        if (!token && !rutasPublicas.includes(location.pathname)) {
            navigate("/usuario/login");
        }
    }, [navigate, location]);


  return (
    <div className='Inicio page'>

      <Portada className="recomendados" />
        
      <section className="tendencias">
        <div className="titulo-tendencias">

          <h3>Articulos populares</h3>


          <button className='boton-vermas' >
            <Link to="/articulos" className="link"> Ver Todos 
              <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
            </Link>
          </button> 

        </div>

        <Articulos enPoint="populares"
          customPadding="0" maxArticulos={6} 
        />
          
      </section>

      <aside className='recientes'>

        <ArticulosLateral />
      </aside>

      <button onClick={() =>  setBtnCrear(true)} className='btn btn-crear btn-save'>
        Crear articulo
      </button>

      {btnCrear && <CrearArticulo setBtnCrear={setBtnCrear} />}

    </div>
  );
}

export default InicioNoAuth;
