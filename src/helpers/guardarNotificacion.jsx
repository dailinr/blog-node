import { Global } from "./Global";

export const guardarNotificacion = async (idSeguidor, idUser) => {
    
  let dataFollow = { idUser, idSeguidor }

  try {

    const request = await fetch(Global.url + "notificaciones/follows", {
      method: "POST",
      body: JSON.stringify(dataFollow),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.status === "success"){
      
      console.log("Notificación guardada: ", data.notificacion);
    }
  } 
  catch (error) {
    console.error("Error al guardar la notificación:", error.response?.data || error.message);
  }

};