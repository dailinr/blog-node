import React from 'react';
import "../../css/articulosUser.css";
import "../../css/explorar_users.css";
import { Global } from '../../helpers/Global';

export const ArticulosPerfil = ({articulo, user}) => {

    const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";

    let urlImagen = articulo.imagen === "default.png" ? 
    articulo.imagen : Global.url + "ver-imagen/" + articulo.imagen;

    let urlIcon = user.image === "default.png" ? 
    avatarDefault : Global.url + "usuario/avatar/" + user.image;
    
  return (

    <article className="row-articulo">

        <div className="art-image">
            <img src={urlImagen}  />
        </div>

        <section className='articulo-content'>

            <div className='flex'>
                <span className="label-lat">{articulo.etiqueta}</span>
                &nbsp; &nbsp; 
                <span className="fecha-card">{articulo.fecha}</span>
            </div>
            
            <div className="art-titulo">
                <h2  className="text-lg font-bold text-gray-800">{articulo.titulo} 
                </h2>
            </div>

            <div className="art-contenido">{articulo.contenido}</div>

            <section className='art-user'>
                <div className='icon-user'>
                    <img src={urlIcon} alt="icon perfil" />
                </div> &nbsp;

                <div className="datos-user">
                    
                    <p className="name_user">
                        {user.name} {user.surname} &nbsp;
                        <span className="follow_user">
                            Seguir
                        </span> 
                    </p>
                    
                    <p className="user-name" style={{fontSize: '15px'}}>
                        @{user.nick}
                    </p>

                </div>
                
            </section> 

        </section>

    </article>
  )
}
