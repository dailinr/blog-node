import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import MenuArticulo from '../modals/MenuArticulo';
import ModalConfirm from '../modals/ModalConfirm';
import Tostada from '../modals/Tostada.jsx';
import { Link, useLocation } from 'react-router-dom';
import { getPerfil } from '../../helpers/getPerfil.jsx';
import useAuth from '../../helpers/hooks/useAuth.jsx';
import { incrementarVistas } from '../../helpers/incrementarVistas.jsx';
import ReactTimeAgo from 'react-time-ago';

export const Listado = ( {cards, setArticulos, setIdEliminar, confirmEliminar}) => {

  const [menuArticulo, setMenuArticulo] = useState(false);
  const [modConfirm, setModConfirm] = useState(false);
  // Nueva variable para almacenar el ID del artículo a eliminar
  const [mostrarToast, setMostrarToast] = useState(false);
  const [user, setUser] = useState({});

  const {auth} = useAuth();

  useEffect(() => {
    getPerfil(cards.user._id, setUser);
  }, []);

  const mostrarMenu = (id) => {
    setMenuArticulo(menuArticulo === id ? !menuArticulo : id);
  }
  
  const eliminar = (id) => {
    
    setIdEliminar(id); // Establecemos el ID del artículo a eliminar
    setModConfirm(true); // Mostramos el modal de confirmación
  } 

  // Condicion para saber el articulo se le ha asignado una imagen
  let urlImagen = cards.imagen !== "default.png"  ?
  Global.url + "ver-imagen/" + cards.imagen : cards.imagen;

  const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  
  let urlIcon = user.image === "default.png" ? 
  avatarDefault : Global.url + "usuario/avatar/" + user.image;
  
  
  return (

    <div className='card'>

      <div className='cont-image'>
      
      <div className="image-card"
        style={{
          // background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url("https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg") no-repeat center / cover`
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url(${urlImagen}) no-repeat center / cover`
        }}>

        <div className="label-card">{cards.etiqueta}</div>
      </div>

      </div>

      <div className="contenido-card">

        {auth._id === user._id &&
          <i className='bx bx-dots-vertical-rounded' onClick={() => mostrarMenu(cards._id)} >
            {menuArticulo === cards._id && 
              <MenuArticulo idArticulo={cards._id} eliminar={eliminar} clase={"menuArticulo"} />
            } 
          </i>
        }

        <div className="time-update"></div>
        
        <div className="titulo-card">
          
          <Link to={"/articulo/"+cards._id} className="text-lg font-bold text-gray-800"
            onClick={cards.user._id != auth._id ? () => incrementarVistas(cards._id, setArticulos): null} >
            {cards.titulo}
          </Link>
        </div>
        
        <div className="text-card">{cards.contenido}</div>

        <div className="datos-autor border-t pt-2">
          <div className="icon-card">
            <img src={urlIcon} alt="icon autor" />
          </div>
          
          <div>
            
            <Link to={"/perfil/"+ user._id} className="nombre-card">
              {user.name} {user.surname} 
            </Link>
            
            <p className="fecha-card">
              {cards.fecha ? (
                <ReactTimeAgo date={new Date(cards.fecha)} locale="es-ES" />
              ) : (
                <span>Fecha no disponible</span>
              )}
            </p>

          </div>

          <Link to={"/articulo/"+cards._id} className='btn btn-ver-mas btn-save'
            onClick={cards.user._id != auth._id ? () => incrementarVistas(cards._id, setArticulos): null} > 
            leer 
          </Link>

        </div>
      </div>

      {modConfirm && (
        <ModalConfirm
          confirmEliminar={confirmEliminar}
          setModConfirm={setModConfirm}
        />
      )}

      {mostrarToast && <Tostada mensaje={"Articulo eliminado"} style={{ width: "100px" }} />}

    </div>
  );
}
