import React from 'react'
import {useState, useEffect} from "react";
import { dataArticle } from '../../Data/dataArticle.js';
import '../../css/articulos.css'

const Articulos = () => {
  return (
    <div className='Articulos'>

      <div className="content-tendencias">
        {dataArticle.map((cards) => (
        
        
          <div key={cards.id} className="card">

              <div className="image-card">
                <div className="label-card">{cards.etiqueta}</div>
              </div>

              <div className="contenido-card">
                <div className="time-update"></div>
                <div className="titulo-card">
                  <h4>{cards.titulo}</h4>
                </div>
                <div className="text-card">
                  {cards.texto}
                </div>

                <div className="datos-autor">
                  <div className="icon-autor icon-card"></div>
                  <div >
                    <p className="nombre-card">{cards.nombre_autor}</p> 
                    <p className="fecha-card">{cards.fecha_edicion}</p>
                  </div>
                </div>
              </div>
            
          </div>

        ))}

        </div>
    </div>
  )
}

export default Articulos