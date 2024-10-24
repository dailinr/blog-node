import React, {useState, useEffect} from 'react'
import useAuth from '../../helpers/hooks/useAuth'
import "../../css/perfil_user.css"
import { Global } from '../../helpers/Global';

export const PerfilUser = () => {

  const {auth, counters} = useAuth();

  const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  const headerDefault = "../../../public/header.jpg";

  let urlImagen = auth.image === "default.png" ? 
    avatarDefault : Global.url + "usuario/avatar/" + auth.image;

  return (
    <div className=' page-perfil'>
      
      <div className='info-perfil'>

        <div className='header-perfil'
          style={{ background: `url(${headerDefault}) no-repeat center / cover` }}>

          <div className='avatar-perfil'
            style={{ background: `url(${urlImagen}) no-repeat center / cover` }}>

          </div>
        </div>

        <div className='data-user'>

          <h2 className='nombre-user'>{auth.name} {auth.surname}</h2>
          <p className='nick-user'>@{auth.nick}</p>

        </div> 
      
        <div className='follow-counters'>
          
          <div className='following'>
            <p>{counters.following} <span>Siguiendo</span> </p>
          </div>

          <div className='followers'>
            <p>{counters.followed} <span>Seguidores</span> </p>
          </div>

          <div className='articulos'>
            <p>{counters.articulos} <span>Articulos</span> </p>
          </div>
        </div>
      </div>

      <div className='post-perfil'>
      jghjhgfdh
      djdjsk
      jsgjhd
      </div>
      
    </div>
  )
}
