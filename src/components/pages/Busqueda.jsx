import React from 'react'
import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import "../../css/articulos.css";
import { Listado } from "./Listado";
import CrearArticulo from './CrearArticulo';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Busqueda = () => {
  
  const [btnCrear, setBtnCrear] = useState(false);
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams(); // nos permite coger el parametro de la URL (valor de busqueda)

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulos();
  }, []);

  useEffect(() => {
    conseguirArticulos();
  }, [params]); // se mantendra actualizado mientras cambiamos los parametros de busqueda

  const conseguirArticulos = async () => {
    const url = BACKEND_URL + "buscar/" + params.busqueda;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    
    const datos = await request.json();

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

        {cargando ? (
          <div className="page-cargando">
            <h1 className='cerrar-texto'>Cargando</h1>
            <span className="loader-out" />
          </div>
        )
        :(
          articulos.length >= 1 ? 

            (articulos.map(cards => (
              
              <Listado key={cards._id}
                cards={cards} setArticulos={setArticulos} 
              /> 
            )))
            
          : 
            <h1 className='jumbo'>No hay articulos</h1> 
        )}

      </div>

      <button onClick={() =>  setBtnCrear(true)} className='btn btn-crear btn-save'>
        Crear articulo
      </button>

      {btnCrear && <CrearArticulo setBtnCrear={setBtnCrear} />}

    </div>
  );
}
