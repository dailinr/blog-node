import React, { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import MenuArticulo from '../modals/MenuArticulo';
import { PeticionAjax } from '../../helpers/PeticionAjax';
import ModalConfirm from '../modals/ModalConfirm';
import Tostada from '../modals/Tostada.jsx';

export const Listado = ( {articulos, setArticulos}) => {
  const [menuArticulo, setMenuArticulo] = useState(false);
  const [modConfirm, setModConfirm] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null); // Nueva variable para almacenar el ID del artículo a eliminar
  const [mostrarToast, setMostrarToast] = useState(false);

  const mostrarMenu = (id) => {
    setMenuArticulo(menuArticulo === id ? !menuArticulo : id);
  }
  
  const eliminar = (id) => {
    
    setIdEliminar(id); // Establecemos el ID del artículo a eliminar
    setModConfirm(true); // Mostramos el modal de confirmación
  } 
  
  const confirmEliminar = async () => {

    //realizamos una peticion ajax con sus respectivos parametros
    let {datos} = await PeticionAjax(Global.url + "articulo/" + idEliminar, "DELETE");
    
    if(datos.status === "success"){
      // guardamos en una lista todos los articulos que no sean el del id eliminado
      let articulosActualizados = articulos.filter(articulo => articulo._id !== idEliminar);
      setArticulos(articulosActualizados); // actualizamos el estado del componente padre (Articulos.jsx)
      setModConfirm(false); // cerramos el modal

      
      // Mostrar la tostada 
      setMostrarToast(true);
    }
  
  }
  
  const editar = (id) => {
    // Lógica para editar el artículo
  };
  
  return (
    <>
    {articulos.map((cards) => {

      // Condicion para saber el articulo se le ha asignado una imagen
      let urlImagen = cards.imagen !== "default.png"  ?
        Global.url + "ver-imagen/" + cards.imagen : cards.imagen;

      return (

        <div key={cards._id} className="card">
          
          <div className="image-card"
            style={{
              // background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url("https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg") no-repeat center / cover`
              background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url(${urlImagen}) no-repeat center / cover`
            }}>

            <div className="label-card">{cards.etiqueta}</div>
          </div>

          <div className="contenido-card">

            
              <i className='bx bx-dots-vertical-rounded' onClick={() => mostrarMenu(cards._id)} >
                {menuArticulo === cards._id && 
                  <MenuArticulo idArticulo={cards._id} eliminar={eliminar} editar={editar} />
                } 
              </i>
            

            <div className="time-update"></div>
            
            <div className="titulo-card">
              <h4 className="text-lg font-bold text-gray-800">{cards.titulo}</h4>
            </div>
            <div className="text-card">{cards.contenido}</div>

            <hr style={{margin: '2px'}} />

            <div className="datos-autor">
              <div className="icon-autor icon-card"></div>
              <div>
                <p className="nombre-card">Nombre Autor</p>
                <p className="fecha-card">{cards.fecha}</p>
              </div>
            </div>
          </div>
        </div>

        
      );
    })}
    
    
    {modConfirm && (
      <ModalConfirm
        confirmEliminar={confirmEliminar}
        setModConfirm={setModConfirm}
      />
    )}

    <strong style={{ width: "100px" }}>
      {mostrarToast && <Tostada mensaje={"Articulo eliminado"} />}
    </strong> 

    </>
  );
}
