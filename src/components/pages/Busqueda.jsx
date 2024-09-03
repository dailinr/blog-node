import React from 'react'
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import "../../css/articulos.css";
import { Global } from "../../helpers/Global";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Listado } from "./Listado";

export const Busqueda = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams(); // nos permite coger el parametro de la URL (valor de busqueda)

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    // console.log(params);
    conseguirArticulos();
  }, []);

  useEffect(() => {
    conseguirArticulos();
  }, [params]); // se mantendra actualizado mientras cambiamos los parametros de busqueda

  const conseguirArticulos = async () => {
    const url = Global.url + "buscar/" + params.busqueda;

    const {datos, cargando} = await PeticionAjax(url, "GET");

    //  console.log(await PeticionAjax(url, "GET"));

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }else{
      setArticulos([]);
    }
    setCargando(false);
  };

  return (
    <div className="Articulos page "  >

      <div className="content-articulos">

        {cargando ? "Cargando..." : (

          articulos.length >= 1 ? 
            <Listado articulos={articulos} setArticulos={setArticulos} /> 
          : 
            <h1 className='jumbo'>No hay articulos</h1> 
        )}

      </div>
    </div>
  );
}
