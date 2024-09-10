import React from 'react'
import { Link } from 'react-router-dom';
import '../../css/menuUser.css';

const MenuArticulo = ({ idArticulo, eliminar }) => {


  return (
    <div className='menuArticulo'>
      
      <ul className='lista list-articulo '>

        <Link to={"/editar/"+idArticulo} className='editar'>
          <li><i className='bx bxs-edit-alt' /> Editar </li>
        </Link>

        <li className='eliminar' onClick={() => eliminar(idArticulo)}> 
            <i className='bx bx-trash' /> Eliminar
        </li>

      </ul>

    </div>
  )
}

export default MenuArticulo