// Portada.jsx
import React, { useEffect, useState } from 'react';
import '../../css/Inicio.css';
import { Global } from '../../helpers/Global';
import { incrementarVistas } from '../../helpers/incrementarVistas';
import { Link } from 'react-router-dom';
import { getPerfil } from '../../helpers/getPerfil';
import useAuth from '../../helpers/hooks/useAuth';
import ReactTimeAgo from 'react-time-ago';

const Portada = () => {
  const [actualSlide, setActualSlide] = useState(0);
  const [articulos, setArticulos] = useState([]);
  const [user, setUser] = useState({});
  const {auth} = useAuth();
  let idUser;

  useEffect(() => {
    conseguirArticulos();
    getPerfil(idUser, setUser);
  }, []);

  useEffect(() => {
    getPerfil(idUser, setUser);
  }, [idUser]);

  const conseguirArticulos = async () => {

    const request = await fetch(Global.url + "mas-vistos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    if (datos.status === "success") {
      setArticulos(datos.articulos.slice(0, 3));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 3 segundos

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

  const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";

  return (
    
    <div className='slider'>
    
      <div className="slides-container" style={{ transform: `translateX(-${actualSlide * 100}%)` }}>

        {articulos.map((portadas) => {

          let urlImagen = portadas.imagen !== "default.png"  ?
          Global.url + "ver-imagen/" + portadas.imagen : portadas.imagen;

          idUser = portadas.user;

          let urlIcon = user.image === "default.png" ? 
          avatarDefault : Global.url + "usuario/avatar/" + user.image;
          
          return(
            <div key={portadas._id} className="portada" style={{
              background: `linear-gradient(to top, rgba(0, 0, 0, 0.863), rgba(56, 56, 56, 0.527)), url(${urlImagen}) no-repeat center / cover`
            }}>

              <Link to={"/articulo/"+portadas._id}
                onClick={portadas.user != auth._id ? () => incrementarVistas(portadas._id, setArticulos): null}>

                <div className="contenido-portada">

                  <div className="etiqueta">
                    <p>{portadas.etiqueta}</p>
                  </div>
                
                  <div className="titulo-portada">
                    <h2>{portadas.titulo}</h2>
                  </div>

                  <div className="text-portada">{portadas.contenido}</div>

                  <div className="autor-portada">
                    <div className="icon-card">
                      <img src={urlIcon} alt="icon autor" />
                    </div>

                    <div className="nombre-autor">
                      <p>{user.name} {user.surname}</p>
                    </div>

                    <div className="fecha-edicion">
                      {portadas.fecha ? (
                        <ReactTimeAgo date={new Date(portadas.fecha)} locale="es-ES" />
                      ) : (
                        <span>Fecha no disponible</span>
                      )}
                    </div>
                  </div>

                </div>

              </Link>
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