import React, { useEffect } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import '../../css/menuUser.css';
import useAuth from '../../helpers/hooks/useAuth';

const menuUser = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  
  const handleClickInside = (e) => {
    e.stopPropagation(); // Evita el evento de cierre global
  };

  useEffect(() => {
    if(!auth){
      navigate("/usuario/login");
    }
  }, []);
  

  return (
    auth && (
      <div className='menuUser' onClick={handleClickInside}>
        
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
          <NavLink to={"/perfil/"+ auth._id}> <li> <i className='bx bx-user' /> Perfil </li></NavLink>
          <NavLink to={"/configuracion"}> <li> <i className='bx bx-cog' /> Configuracion </li> </NavLink>
          <NavLink to={"/favoritos"}> <li> <i className='bx bx-heart'/> Favoritos </li> </NavLink>
          <NavLink to={"/logout"}> <li> <i className='bx bx-log-out-circle'/> Cerrar Sesion </li> </NavLink>
        </ul>

      </div>
    )
  )
}

export default menuUser