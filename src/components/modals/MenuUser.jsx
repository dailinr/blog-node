import React from 'react'
import '../../css/menuUser.css';

const menuUser = () => {
    

  return (
    <div className='menuUser'>
      
      <div className="datosUser">
        <div className='nombre_usuario'>
          Dailin Romero
        </div>
        <div className='user'>
          @dayromero27
        </div>
      </div>
      <hr/>

      <ul className='lista'>
        <li> <i className='bx bx-user'></i> Perfil</li>
        <li><i className='bx bx-cog'></i> Configuracion</li>
        <li><i className='bx bx-log-out-circle'></i> Cerrar Sesion</li>
      </ul>

    </div>
  )
}

export default menuUser