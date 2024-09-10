// Portada.jsx
import React, {  useContext, useEffect, useState } from 'react';
import '../../css/Inicio.css';
// import { ArticulosContext } from '../../helpers/ArticulosContext.jsx';
import { Global } from '../../helpers/Global';
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { formatearTiempoRelativo } from '../../helpers/ConvertirFecha';

const Portada = () => {
    const [actualSlide, setActualSlide] = useState(0);
    // const { articulos } = useContext(ArticulosContext);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
      conseguirArticulos();
    }, []);

    const conseguirArticulos = async () => {
      const url = Global.url + "listar";
  
      const {datos} = await PeticionAjax(url, "GET");
  
      if (datos.status === "success") {
        
        if(articulos.length <= 3){
          setArticulos(datos.articulos.slice(0, 3));
        }
        
      }else{
        setArticulos([]);
      }

    };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [articulos.length]);

  // Función para avanzar el slider
  const nextSlide = () => {
    setActualSlide((prevSlide) => (prevSlide + 1) % articulos.length);
  };

  // Función para retroceder el slider
  const prevSlide = () => {
    setActualSlide((prevSlide) => (prevSlide - 1 + articulos.length) % articulos.length);
  };


  return (
    <div className='slider'>
        <div className="slides-container" style={{ transform: `translateX(-${actualSlide * 100}%)` }}>

          {articulos.map((portadas) => {

            let urlImagen = portadas.imagen !== "default.png"  ?
            Global.url + "ver-imagen/" + portadas.imagen : portadas.imagen;

            return(
              <div key={portadas._id} className="portada" style={{
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.863), rgba(56, 56, 56, 0.527)), url(${urlImagen}) no-repeat center / cover`
              }}>

                <div className="contenido-portada">
                  
                  <div className="etiqueta">
                    <p>{portadas.etiqueta}</p>
                  </div>
                
                  <div className="titulo-portada">
                    <h2>{portadas.titulo}</h2>
                  </div>
                  <div className="text-portada">{portadas.contenido}</div>
                  <div className="autor-portada">
                    <div className="icon-autor"></div>
                    <div className="nombre-autor">
                      <p>Nombre autor{portadas.nombre_autor}</p>
                    </div>
                    <div className="fecha-edicion">{formatearTiempoRelativo(portadas.fecha)}</div>
                  </div>

                </div>
              </div>
            );
            
          })}
        </div>

        <button className='prev' onClick={prevSlide}>&#10094;</button>
        <button className='next' onClick={nextSlide}>&#10095;</button>
      
        <div className="indicators">
          {articulos.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === actualSlide ? 'active' : ''}`}
              onClick={() => setActualSlide(index)}
            ></span>
          ))}
        </div>

      </div>
  );
};

export default Portada;