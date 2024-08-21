import React from 'react'
import '../../css/menuUser.css';

const menuArticulo = () => {

  return (
    <div className='menuArticulo'>
      
      <ul className='lista list-articulo '>
        <li className='editar'> <i class='bx bxs-edit-alt'></i> Editar</li>
        <li className='eliminar'> <i className='bx bx-trash' /> Eliminar </li>
      </ul>

    </div>
  )
}

export default menuArticulo