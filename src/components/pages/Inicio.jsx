import React, { useContext, useState } from 'react';
import '../../css/Inicio.css';
import Portada from '../layouts/Portada.jsx';
import { ArticulosContext } from '../../helpers/ArticulosContext.jsx';
import Articulos from './Articulos.jsx';
import ArticulosLateral from '../layouts/ArticulosLateral.jsx';
import CrearArticulo from './CrearArticulo.jsx';
import { useNavigate } from 'react-router-dom'; 

const Inicio = () => {
  const { articulos } = useContext(ArticulosContext);
  const [btnCrear, setBtnCrear] = useState(false);
  const [enPoint, setEnPoint] = useState("siguiendo");
  const navigate = useNavigate();

  const handleBtncrear = () => {
    setBtnCrear(true);
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

      {articulos.length >= 1 ? (
      <>
        
        <Portada className="recomendados" />
          
        <section className="tendencias">
          <div className="titulo-tendencias">
            <h3>Tendencias</h3>

            <select onChange={handleSelectChange}
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
