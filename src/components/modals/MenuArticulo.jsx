import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../../css/menuUser.css';

const MenuArticulo = ({ idArticulo, eliminar, clase }) => {

  const handleClickInside = (e) => {
    e.stopPropagation(); // Evita el evento de cierre global
  };

  return (
    <div className={clase} onClick={handleClickInside}>
      
      <ul className='lista list-articulo '>

        <Link  to={"/editar/"+ idArticulo}>
          <li className='editar' > 
            <i className='bx bxs-edit-alt' /> 
              Editar 
          </li>
        </Link>        

        <li className='eliminar' onClick={() => eliminar(idArticulo)}> 
          <i className='bx bx-trash' /> Eliminar
        </li>

      </ul>

    </div>
  )
}

export default MenuArticulo