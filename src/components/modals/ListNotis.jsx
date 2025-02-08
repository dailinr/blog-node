import React from 'react';
import "../../css/notificaciones.css"
 ;
import ReactTimeAgo from 'react-time-ago';
import { NavLink } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ListNotis = ({ noti }) => {
    
    const avatarDefault = `${import.meta.env.BASE_URL}default-avatar-profile-icon-of-social-media-user-vector.jpg`;
    let urlIcon = noti.seguidor.image === "default.png" ? 
        avatarDefault : BACKEND_URL + "usuario/avatar/" + noti.seguidor.image;

  return (
    
    <NavLink to={"/perfil/"+ noti.seguidor._id}> 
    <div className='lista-notis'  >

        <span className="fecha-card">
            {noti.created_at ? (
                <ReactTimeAgo date={new Date(noti.created_at)} locale="es-ES" />
            ):(
                <span>Fecha no disponible</span>
            )}
        </span>
        
        <div className='row-noti'>

            <div className="icon-card">
                <img src={urlIcon} alt="icon autor" />
            </div>
            
            &nbsp; &nbsp;

            <p>te ha seguido {noti.seguidor.name} </p>
        </div>

        
    </div>
    <hr />
    </NavLink>
    
  )
}
