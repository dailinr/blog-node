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
{console.log(auth.id)}
      <ul className='lista'>
        <NavLink to={"/perfil/"+ auth.id}> <li> <i className='bx bx-user' /> Perfil </li></NavLink>
        <NavLink to={"/configuracion"}> <li> <i className='bx bx-cog' /> Configuracion </li> </NavLink>
        <NavLink to={"/logout"}> <li> <i className='bx bx-log-out-circle'/> Cerrar Sesion </li> </NavLink>
      </ul>

    </div>
  )
}

export default menuUser