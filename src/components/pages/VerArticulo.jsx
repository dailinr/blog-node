import React from 'react'
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import '../../css/ver_articulo.css'
import '../../css/Inicio.css';
import ReactTimeAgo from 'react-time-ago';
import ArticulosLateral from '../layouts/ArticulosLateral';
import { getPerfil } from '../../helpers/getPerfil';
import useAuth from '../../helpers/hooks/useAuth';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const VerArticulo = () => {
  const { id }  = useParams();
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const [user, setUser] = useState({});
  const [favoritos, setFavoritos] = useState();
  const {auth} = useAuth();

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    
    if(auth){
      conseguirArticulo();
      verificarFavorito();
    }
  }, [id]);
  

  const verificarFavorito = async () => {

    const url = BACKEND_URL + "usuario/favoritos";

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    if(datos.status === "success"){
      
      setFavoritos(datos.favoritos.some((fav) => fav._id == id));
    }
    else{
      console.log("error al conseguir los articulos favoritos");
    }

  }

  const avatarDefault = `${import.meta.env.BASE_URL}default-avatar-profile-icon-of-social-media-user-vector.jpg`;
      
  let urlIcon = user.image === "default.png" ? 
  avatarDefault : BACKEND_URL + "usuario/avatar/" + user._id;

  const conseguirArticulo = async () => {
    const url = BACKEND_URL + "articulo/"+ id;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    if (datos.status === "success") {
      setArticulo(datos.articulo);

      const idPerfil = datos.articulo.user;
      getPerfil(idPerfil, setUser);
    }
    else{
      setArticulo([]);
    }

    setCargando(false);
  };

  const agregarFavoritos = async () => {
    const url = BACKEND_URL + "add-favoritos/"+ id;

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    if(datos.status == "success"){
      setFavoritos(true);
    }
    else{
      console.log("Error al agregar a favoritos");
    }
  }

  const eliminarFavoritos = async () => {
    const url = BACKEND_URL + "eliminar-favs/"+ id;

    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    if(datos.status == "success"){
      setFavoritos(false);
    }
    else{
      console.log("error al eliminar de favoritos");
    }
  }

  // Conseguir url de la imagen del articulo
  let urlImagen = articulo.imagen !== "default.png" ?
    BACKEND_URL + "ver-imagen/" + articulo._id : articulo.imagen;


  return (
    
    cargando ? (
      <div className="page-cargando">
        <h1 className='cerrar-texto'>Cargando</h1>
        <span className="loader-out" />
      </div>
    )
    : (
      <section className="vista-articulo">

        <ArticulosLateral />

        <section className='contenido-articulo'>
          
          <div className='info-articulo'>
            <span  className='fecha-articulo'>
              {articulo.fecha ? (
                <ReactTimeAgo date={new Date(articulo.fecha)} locale="es-ES" />
              ) : (
                <span>Fecha no disponible</span>
              )} &nbsp; | &nbsp;
              
              <span className='etiqueta'> {articulo.etiqueta} </span> 
            </span>

            <p className='favoritos'>
              
              {articulo.user !== auth._id && (
                favoritos ? ( <>
                  <i className='bx bxs-heart mr-1' onClick={eliminarFavoritos} />
                  <div className="title-favs">Agregado a favoritos</div> </> 
                ):
                (<>
                  <i className='bx bx-heart mr-1' onClick={agregarFavoritos} />
                  <div className="title-favs">Agregar a favoritos</div> </>
                )
              )}

              <Link to={"/perfil/"+ user._id} className='icon-user' style={{ marginLeft: '18px'}}>
                <img  src={urlIcon} alt="icon perfil"  />
              </Link> 
            </p>

          </div>

          <h1>{articulo.titulo}</h1>

          <p className='texto-articulo'>{articulo.contenido}</p>

          <div className='imagen-articulo'>
            <img src={urlImagen} alt={articulo.titulo} />
          </div>            
        </section>

      </section>
    )
  
  )
}
