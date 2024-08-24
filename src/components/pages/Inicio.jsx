import React, { useContext } from 'react';
import '../../css/Inicio.css';
import { Link } from "react-router-dom"
import Portada from '../layouts/Portada.jsx';
import { ArticulosContext } from '../../helpers/ArticulosContext.jsx';
import Articulos from './Articulos.jsx';
import ArticulosLateral from '../layouts/ArticulosLateral.jsx';

const Inicio = () => {
  const { articulos } = useContext(ArticulosContext);

  return (
    <div className='Inicio page'>
      
      

      {articulos.length >= 1 ? (
        <>
        <Portada />

        <div className='art-inicio'>
          
          <section className="tendencias">
            <div className="titulo-tendencias">
              <h3>Tendencias</h3>
              <button className='boton-vermas' >
                <Link to="/articulos" className="link"> Ver Todos 
                  <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
                </Link>
              </button>
            </div>

            <Articulos customPadding="0 15px 10px 0 "  />
            
          </section>
          
          <aside className='recientes'>
            
            <h4 className='titulo-recientes'>Recientes</h4>

            <ArticulosLateral />
          </aside>

        </div>
        </>
      ): 
        <h1>No hay articulos</h1> 
      }

    </div>
  );
}

export default Inicio;
