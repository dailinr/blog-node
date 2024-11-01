import React, { useContext, useState } from 'react';
import '../../css/Inicio.css';
import { Link } from "react-router-dom"
import Portada from '../layouts/Portada.jsx';
import { ArticulosContext } from '../../helpers/ArticulosContext.jsx';
import Articulos from './Articulos.jsx';
import ArticulosLateral from '../layouts/ArticulosLateral.jsx';
import CrearArticulo from './CrearArticulo.jsx';

const Inicio = () => {
  const { articulos } = useContext(ArticulosContext);
  const [btnCrear, setBtnCrear] = useState(false);

  const handleBtncrear = () => {
    setBtnCrear(true);
  }
  
  let enPoint = "inicio";


  return (
    <div className='Inicio page'>

      {articulos.length >= 1 ? (
      <>
        
        
          <Portada 
            className="recomendados" 

          />
        

        {/* <div className='art-inicio'> */}
          
          <section className="tendencias">
            <div className="titulo-tendencias">
              <h3>Tendencias</h3>
              <button className='boton-vermas' >
                <Link to="/articulos" className="link"> Ver Todos 
                  <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
                </Link>
              </button>
            </div>


            <Articulos 
              enPoint={enPoint}
              customPadding="0" maxArticulos={6} 
            />
            
          </section>

        {/* </div> */}

        <aside className='recientes'>

          <ArticulosLateral />
        </aside>
      </>
      ): 
        <h1>No hay articulos</h1> 
      }

      <button onClick={handleBtncrear} className='btn btn-crear btn-save'>
        Crear articulo
      </button>

      {btnCrear && <CrearArticulo setBtnCrear={setBtnCrear} />}

    </div>
  );
}

export default Inicio;
