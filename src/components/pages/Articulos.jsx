import React from "react";
import { useState, useEffect } from "react";
// import { articulos } from "../../Data/articulos.js";
import "../../css/articulos.css";
import { Global } from "../../helpers/Global";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Listado } from "./Listado";

const Articulos = ({ customPadding, customWidth, customJustify, maxArticulos }) => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    
    const request = await fetch(Global.url + "listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const datos = await request.json();

    //  console.log(await PeticionAjax(url, "GET"));

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
    setCargando(false);
  };

  // si la prop tienen un valor limite guardará solo esos articulos, sino guardará todos los articulos
  const articulosLimitados = maxArticulos ? articulos.slice(0, maxArticulos) : articulos;

  return ( 
    <div className="Articulos page " 
      style={{ padding: customPadding, width: customWidth, justifyContent: customJustify }}>

      <div className="content-articulos">

        {cargando ? "Cargando..." : (

          articulos.length >= 1 ? 
          
            articulosLimitados.map(cards => {

              return(
                <Listado key={cards._id} 
                  cards={cards} setArticulos={setArticulos}
                /> 
              )
            })
          : 
            <h1>No hay articulos</h1> 
        )}

      </div>
    </div>
  );
};

export default Articulos;
