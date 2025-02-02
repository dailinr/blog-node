import React, {useState} from 'react';
import "../../css/articulosUser.css";
import "../../css/explorar_users.css";
import { Global } from '../../helpers/Global';
import useAuth from '../../helpers/hooks/useAuth';
import MenuArticulo from '../modals/MenuArticulo';
import ModalConfirm from '../modals/ModalConfirm';
import { incrementarVistas } from '../../helpers/incrementarVistas';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export const ArticulosPerfil = ({articulo, setArticulos, user, seguirUsuario,
    unfollowUsuario, iFollow, setIdEliminar, confirmEliminar}) => {

    const {auth} = useAuth();
    const [menuArticulo, setMenuArticulo] = useState(false);
    const [modConfirm, setModConfirm] = useState(false);

    const mostrarMenu = (id) => {
        setMenuArticulo(menuArticulo === id ? !menuArticulo : id);
    }

    const eliminar = (id) => {

        setIdEliminar(id); // Establecemos el ID del artículo a eliminar
        setModConfirm(true); // Mostramos el modal de confirmación
    }

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

            {auth._id === user._id &&
                <i className='bx bx-dots-horizontal-rounded' 
                    onClick={() => mostrarMenu(articulo._id)} >
                        
                    {menuArticulo === articulo._id && 
                        <MenuArticulo idArticulo={articulo._id} eliminar={eliminar} clase={"menu_user"} />
                    } 
                </i>
            }

            <div className='flex'>
                <span className="label-lat">{articulo.etiqueta}</span>
                &nbsp; &nbsp; 

                <span className="fecha-card">
                    {articulo.fecha ? (
                        <ReactTimeAgo date={new Date(articulo.fecha)} locale="es-ES" />
                    ):(
                        <span>Fecha no disponible</span>
                    )}
                </span>
            </div>
            
            <div className="art-titulo">
                
                <Link to={"/articulo/"+articulo._id}
                    onClick={articulo.user._id != auth._id ? () => incrementarVistas(articulo._id, setArticulos): null}>
                    
                    <h2 className="text-lg font-bold text-gray-800">
                        {articulo.titulo} 
                    </h2>
                </Link>
            </div>

            <div className="art-contenido">{articulo.contenido}</div>

            <section className='art-user'>
                <div className='icon-user'>
                    <img src={urlIcon} alt="icon perfil"  />
                </div> &nbsp;

                <div className="datos-user">
                    
                    <p className="name_user">
                        {user.name} {user.surname} &nbsp;
                        
                        {user._id != auth._id &&

                            (!iFollow ?
                                <button onClick={() => seguirUsuario(user._id)} className="follow_user ">
                                    Seguir
                                </button>
                            :
                                <button onClick={() => unfollowUsuario(user._id)} className="follow_user">
                                    Siguiendo
                                </button>
                            )
                        }
                    </p>
                    
                    <p className="user-name" style={{fontSize: '15px'}}>
                        @{user.nick}
                    </p>

                </div>
                
            </section> 

        </section>

        {modConfirm && (
            <ModalConfirm
                confirmEliminar={confirmEliminar}
                setModConfirm={setModConfirm}
            />
        )}


    </article>
  )
}
