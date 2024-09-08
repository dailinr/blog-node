import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../css/ver_articulo.css'
import '../../css/Inicio.css';
import { Global } from "../../helpers/Global";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { formatearTiempoRelativo } from '../../helpers/ConvertirFecha';

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

    console.log(url);

    const {datos, cargando} = await PeticionAjax(url, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }

    setCargando(false);
  };

  // Conseguir url de la imagen del articulo
  let urlImagen = articulo.imagen !== "default.png" ?
    Global.url + "ver-imagen/" + articulo.imagen : articulo.imagen;


  return (
    
    cargando ? "Cargando..." : (
      <div className='ver-articulo'>

        <section className='contenido-articulo'>
          <h1>articulo {articulo.titulo}</h1>

          <span>
            {formatearTiempoRelativo(articulo.fecha) }
            <span className='etiqueta'> {articulo.etiqueta} </span> 
          </span>

          <div className='imagen-articulo'>
            <img src={urlImagen} alt={articulo.titulo} />
          </div>

          <p className='texto-articulo'>{articulo.contenido}</p>
        </section>

      </div>
    )
  
  )
}
