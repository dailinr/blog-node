import React, { useState, useEffect } from 'react';
import '../../css/Inicio.css';
import Portada from '../layouts/Portada.jsx';
import Articulos from './Articulos.jsx';
import ArticulosLateral from '../layouts/ArticulosLateral.jsx';
import CrearArticulo from './CrearArticulo.jsx';
import { useNavigate } from 'react-router-dom'; 
import useAuth from '../../helpers/hooks/useAuth.jsx';
 

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Inicio = () => {
  const [btnCrear, setBtnCrear] = useState(false);
  const [enPoint, setEnPoint] = useState("siguiendo");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [counters, setCounters] = useState({});

  useEffect(() => {
    if(auth) getCounters();
  }, []);

  useEffect(() => {
    // Cambiar automáticamente el selector a "populares" si no hay "siguiendo"
    if (!counters || counters === 0) {
      setEnPoint("populares");
    }
  }, [counters]);

  const getCounters = async() => {

    const request = await fetch(BACKEND_URL + "usuario/counters/" + auth._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();
  
    setCounters(data.following);
  }

  const handleSelectChange = (e) => {
    const value = e.target.value;

    switch (value) {

      case 'siguiendo':
        setEnPoint('siguiendo');
        break;
      case 'populares':
        setEnPoint('populares');
        break;
      case 'todos':
        navigate("/articulos");
        break;
      default:
        setEnPoint('siguiendo');
        break;
    }
  };

  return (
    <div className='Inicio page'>

      <Portada className="recomendados" />
        
      <section className="tendencias">
        <div className="titulo-tendencias">

          <h3>
            {enPoint == "siguiendo" ? 
              "Feed seguidos" : 
              "Articulos populares"  
            }
          </h3>
          
          <select onChange={handleSelectChange} value={enPoint}
            className="select select-bordered select-sm w-50 max-w-xs " >

            <option value="siguiendo">Siguiendo</option>
            <option value="populares">Populares</option>
            <option value="todos">Todos</option>

          </select>


          {/* <button className='boton-vermas' >
            <Link to="/articulos" className="link"> Ver Todos 
              <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
            </Link>
          </button>  */}

        </div>

        <Articulos 
          enPoint={enPoint}
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

export default Inicio;
