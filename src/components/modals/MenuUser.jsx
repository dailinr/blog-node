import React from 'react'
import { NavLink } from 'react-router-dom';
import '../../css/menuUser.css';
import useAuth from '../../helpers/hooks/useAuth';

const menuUser = () => {
  const { auth } = useAuth();

  return (
    <div className='menuUser'>
      
      <div className="datosUser">
        <div className='nombre_usuario'>
          {auth.name} {auth.surname}
        </div>
        <div className='user'>
          @{auth.nick}
        </div>
      </div>
      <hr/>

      <ul className='lista'>
        <li> <i className='bx bx-user'></i> Perfil</li>
        <li><i className='bx bx-cog'></i> Configuracion</li>
        <NavLink to={"/logout"} ><li ><i className='bx bx-log-out-circle'></i> Cerrar Sesion</li></NavLink>
      </ul>

    </div>
  )
}

export default menuUser