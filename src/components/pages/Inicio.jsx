import React, { useEffect, useState } from 'react';
import '../../css/Inicio.css';
import { dataArticle } from '../../Data/dataArticle.js';
import { Link } from "react-router-dom"
import { Listado } from './Listado.jsx';


const Inicio = () => {
  const [actualSlide, setActualSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActualSlide((prevSlide) => (prevSlide === dataArticle.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActualSlide((prevSlide) => (prevSlide === dataArticle.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setActualSlide((prevSlide) => (prevSlide === 0 ? dataArticle.length - 1 : prevSlide - 1));
  };

  return (
    <div className='Inicio'>

      <div className='slider'>
        <div className="slides-container" style={{ transform: `translateX(-${actualSlide * 100}%)` }}>

          {dataArticle.map((portadas) => (
            <div key={portadas.id} className="portada">

              <div className="contenido-portada">
                
                <div className="etiqueta">
                  <p>{portadas.etiqueta}</p>
                </div>
              
                <div className="titulo-portada">
                  <h2>{portadas.titulo}</h2>
                </div>
                <div className="text-portada">{portadas.texto}</div>
                <div className="autor-portada">
                  <div className="icon-autor"></div>
                  <div className="nombre-autor">
                    <p>{portadas.nombre_autor}</p>
                  </div>
                  <div className="fecha-edicion">{portadas.fecha_edicion}</div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <button className='prev' onClick={prevSlide}>&#10094;</button>
        <button className='next' onClick={nextSlide}>&#10095;</button>
      
        <div className="indicators">
          {dataArticle.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === actualSlide ? 'active' : ''}`}
              onClick={() => setActualSlide(index)}
            ></span>
          ))}
        </div>

      </div>

      <div className="tendencias">
        <div className="titulo-tendencias">
          <h3>Tendencias</h3>
          <button className='boton-vermas' >
            <Link to="/articulos" className="link"> Ver Todos 
              <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
            </Link>
          </button>
        </div>

        <div className="content-tendencias">

        {/* {dataArticle.slice(0, 4).map((cards) => (  ))} */}
          {/* <Listado  /> */}

        </div>
      </div>

      <div className="recientes"></div>
    </div>
  );
}

export default Inicio;
