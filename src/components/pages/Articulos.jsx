import React from "react";
import { useState, useEffect } from "react";
// import { articulos } from "../../Data/articulos.js";
import "../../css/articulos.css";
import { Global } from "../../helpers/Global";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Listado } from "./Listado";

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulos();
  }, [])

  const conseguirArticulos = async () => {
    const url = Global.url + "listar";

    const {datos, cargando} = await PeticionAjax(url, "GET");

    //  console.log(await PeticionAjax(url, "GET"));

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
    setCargando(false);
  };

  return (
    <div className="Articulos page ">
      <div className="content-tendencias">

        {cargando ? "Cargando..." : (

          articulos.length >= 1 ? 
            <Listado articulos={articulos} setArticulos={setArticulos} /> 
          : 
            <h1>No hay articulos</h1> 
        )}

      </div>
    </div>
  );
};

export default Articulos;
