import React from 'react';
import "../../css/notificaciones.css"
import { Global } from '../../helpers/Global';
import ReactTimeAgo from 'react-time-ago';
import { NavLink } from 'react-router-dom';

export const ListNotis = ({ noti }) => {
    
    const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
    let urlIcon = noti.seguidor.image === "default.png" ? 
        avatarDefault : Global.url + "usuario/avatar/" + noti.seguidor.image;

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
