// src/Vista.js
import React, { useEffect, useState } from 'react';
import './vista.css';

const dataCover = [
  {
    id: 1,
    etiqueta: 'trabajo',
    titulo: 'El impacto de la tecnología actual en el trabajo.',
    texto: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti esse possimus quibusdam mollitia. Maiores provident, sunt quo ipsa, sit quae iure explicabo in officiis, adipisci nam ducimus voluptatem perspiciatis molestiae!',
    nombre_autor: 'Arturo Vidal',
    fecha_edicion: 'Agosto 20, 2023',
  },
  {
    id: 2,
    etiqueta: 'tecnología',
    titulo: 'Facebook enfrenta demanda por violación a la privacidad de sus usuarios.',
    texto: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti esse possimus quibusdam mollitia. Maiores provident, sunt quo ipsa, sit quae iure explicabo in officiis, adipisci nam ducimus voluptatem perspiciatis molestiae!',
    nombre_autor: 'James Rodriguez',
    fecha_edicion: 'Julio 20, 2023',
  },
];

const Vista = () => {
  const [actualSlide, setActualSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActualSlide((prevSlide) => (prevSlide === dataCover.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActualSlide((prevSlide) => (prevSlide === dataCover.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setActualSlide((prevSlide) => (prevSlide === 0 ? dataCover.length - 1 : prevSlide - 1));
  };

  return (
    <div className='vista'>
      <div className='slider'>
        <div className="slides-container" style={{ transform: `translateX(-${actualSlide * 100}%)` }}>
          {dataCover.map((portadas) => (
            <div key={portadas.id} className="portada">
              <div className="contenido-portada">
                <div className="etiqueta">
                  <p>{portadas.etiqueta}</p>
                </div>
                <div className="titulo-portada">
                  <h1>{portadas.titulo}</h1>
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
          {dataCover.map((_, index) => (
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
          <button className='boton-vermas'>
            Ver Todos 
            <i className='bx bx-right-arrow-alt' style={{fontSize: 'medium'}}></i>
          </button>
        </div>
        <div className="content-tendencias">
          <div className="card">
            <div className="card-content">
              <div className="image-card"></div>
              <div className="contenido-card">
                <div className="titulo-card"></div>
                <div className="text-card"></div>
              </div>
            </div>
          </div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>

      <div className="recientes"></div>
    </div>
  );
}

export default Vista;
