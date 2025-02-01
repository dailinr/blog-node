import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../css/ver_articulo.css'
import '../../css/Inicio.css';
import { Global } from "../../helpers/Global";
import ReactTimeAgo from 'react-time-ago';
import ArticulosLateral from '../layouts/ArticulosLateral';

export const VerArticulo = () => {
  const { id }  = useParams();
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    const url = Global.url + "articulo/"+ id;

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
    }else{
      setArticulo([]);
    }

    setCargando(false);
  };

  // Conseguir url de la imagen del articulo
  let urlImagen = articulo.imagen !== "default.png" ?
    Global.url + "ver-imagen/" + articulo.imagen : articulo.imagen;


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
            

            <span  className='fecha-articulo'>
              {articulo.fecha ? (
                <ReactTimeAgo date={new Date(articulo.fecha)} locale="es-ES" />
              ) : (
                <span>Fecha no disponible</span>
              )} &nbsp; | &nbsp;
              
              <span className='etiqueta'> {articulo.etiqueta} </span> 
            </span>

            <h1>articulo {articulo.titulo}</h1>

            <p className='texto-articulo'>{articulo.contenido}</p>

            <div className='imagen-articulo'>
              <img src={urlImagen} alt={articulo.titulo} />
            </div>            
          </section>

      </section>
    )
  
  )
}
