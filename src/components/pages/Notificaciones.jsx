import React, { useEffect, useState} from 'react';
import { Global } from "../../helpers/Global.jsx";
import { ListNotis } from './ListNotis.jsx';
import "../../css/notificaciones.css";
import { useGlobalContext } from '../../helpers/GlobalContext.jsx';

export const Notificaciones = ({ idUser } ) => {

  const [notis, setNotis] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { refreshKey } = useGlobalContext();
  
  useEffect(() => {
    conseguirNotis();
  }, []);

  useEffect(() => {
    conseguirNotis();
  }, [refreshKey]);
  
  const conseguirNotis = async () => {

    setCargando(true);
    setNotis([]);

    try {

      const request = await fetch(Global.url + "notificaciones/mostrar/"+ idUser, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const data = await request.json();

      if(data.status === "success") setNotis(data.notificaciones);

      setCargando(false);
    } 
    catch (error) {
      console.error("Error al obtener las notificaciones:", error.response?.data || error.message);
    }  
  }
  
  return (
    
    <div className='notis'>

      {cargando ? (
        <div className="page-cargando">
          <h1 className='cerrar-texto'>Cargando</h1>
          <span className="loader-out" />
        </div>
      )
      :(
        notis.length >= 1 ? (

          notis.map(noti => (

            <ListNotis key={noti._id} noti={noti} cargando={cargando} /> 
          ))
        )
        :(
          <h1>No hay notificaciones</h1>
        )
      )} 

    </div>
       
  )
}