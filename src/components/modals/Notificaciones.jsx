import React, { useEffect, useState} from 'react';
import { Global } from "../../helpers/Global.jsx";
import { ListNotis } from './ListNotis.jsx';
import "../../css/notificaciones.css";
import { useGlobalContext } from '../../helpers/GlobalContext.jsx';

export const Notificaciones = ({ idUser } ) => {

  const [notis, setNotis] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { refreshKey } = useGlobalContext();
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    conseguirNotis();
  }, []);

  useEffect(() => {
    conseguirNotis();
  }, [refreshKey]);

  const nextPage = () => {
    let next = page + 1;
    setPage(next);

    conseguirNotis(next);
  }
  
  const conseguirNotis = async (nextPage) => {
    
    setCargando(true);
    setNotis([]);

    try {

      const request = await fetch(Global.url + "notificaciones/mostrar/"+ idUser +"/"+nextPage, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const data = await request.json();

      if(data.status === "success"){ 
        
        setNotis(data.notificaciones); 

        // Paginacion - condición no mostrar btn ver más
        if(!data.pagination.nextPage){
          setMore(false);
        }
      }

      setCargando(false);
    } 
    catch (error) {
      console.error("Error al obtener las notificaciones:", error.response?.data || error.message);
    }  
  }

  const handleClickInside = (e) => {
    e.stopPropagation(); // Evita el evento de cierre global
  };
  
  return (
    
    <div className='notis' onClick={handleClickInside}>

      {cargando ? (
        <div className="page-cargando">
          <h1 className='cerrar-texto'>Cargando</h1>
          <span className="loader-out" />
        </div>
      )
      :(
        notis.length >= 1 ? (
          <>
          {notis.map(noti => (

            <ListNotis key={noti._id} noti={noti} cargando={cargando} /> 
          ))}

          {more &&
            <button className="more-notis flex" style={{margin: "0 auto"}} onClick={nextPage} >
              Ver más
            </button> 
          }
          </>
        )
        :(
          <h1>No hay notificaciones</h1>
        )
      )} 

    </div>
       
  )
}