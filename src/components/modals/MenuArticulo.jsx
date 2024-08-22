import React from 'react'
import '../../css/menuUser.css';

const MenuArticulo = ({ idArticulo, eliminar, editar }) => {


  return (
    <div className='menuArticulo'>
      
      <ul className='lista list-articulo '>

        <li className='editar' onClick={() =>  editar(idArticulo)}> 
            <i className='bx bxs-edit-alt' /> Editar
        </li>

        <li className='eliminar' onClick={() => eliminar(idArticulo)}> 
            <i className='bx bx-trash' /> Eliminar
        </li>

      </ul>

    </div>
  )
}

export default MenuArticulo