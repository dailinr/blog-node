import React, { useEffect, useState } from 'react';
import '../../css/Inicio.css';
import { Link } from "react-router-dom"
import Portada from '../layouts/Portada.jsx';


const Inicio = () => {
 

  return (
    <div className='Inicio page'>

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

      <div className="recientes"></div>
    </div>
  );
}

export default Inicio;
