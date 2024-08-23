import React, { useContext } from 'react';
import '../../css/Inicio.css';
import { Link } from "react-router-dom"
import Portada from '../layouts/Portada.jsx';
import { ArticulosContext } from '../../helpers/ArticulosContext.jsx';
import { Listado } from './Listado.jsx';
import Articulos from './Articulos.jsx';

const Inicio = () => {
  const { articulos } = useContext(ArticulosContext);

  return (
    <div className='Inicio page'>

      <div style={{paddingRight: '50px', paddingLeft: '50px'}}>
        <Portada />

        <div className="tendencias">
          <div className="titulo-tendencias">
            <h3>Tendencias</h3>
            <button className='boton-vermas' >
              <Link to="/articulos" className="link"> Ver Todos 
                <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
        

      {articulos.length >= 1 ? 
        <Articulos  />
      : 
        <h1>No hay articulos</h1> 
      }

      

      <div className="recientes"></div>
    </div>
  );
}

export default Inicio;
