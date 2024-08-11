import React from 'react'

export const Listado = ( {articulos, setArticulos}) => {
  return (

    articulos.map((cards) => (
        <div key={cards._id} className="card">

          <div className="image-card"
            style={{
              // background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url("https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg") no-repeat center / cover`
              background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url(${cards.imagen}) no-repeat center / cover`
            }}>
              
            {cards.imagen}
            <div className="label-card">{cards.etiqueta}</div>
          </div>

          <div className="contenido-card">
            <div className="time-update"></div>
            <div className="titulo-card">
              <h4>{cards.titulo}</h4>
            </div>
            <div className="text-card">{cards.contenido}</div>

            <div className="datos-autor">
              <div className="icon-autor icon-card"></div>
              <div>
                <p className="nombre-card">Nombre Autor</p>
                <p className="fecha-card">{cards.fecha}</p>
              </div>
            </div>
          </div>
        </div>
      ))
  )
}
