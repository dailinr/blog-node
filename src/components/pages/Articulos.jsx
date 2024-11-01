import React from "react";
import { useState, useEffect } from "react";
// import { articulos } from "../../Data/articulos.js";
import "../../css/articulos.css";
import { Global } from "../../helpers/Global";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Listado } from "./Listado";
import CrearArticulo from "./CrearArticulo";

const Articulos = ({ customPadding, customWidth, customJustify, maxArticulos}) => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const [idEliminar, setIdEliminar] = useState(null);
  const [btnCrear, setBtnCrear] = useState(false);
  

  const handleBtncrear = () => {
    setBtnCrear(true);
  }

  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulos(page);
  }, []);

  const conseguirArticulos = async (nextPage) => {
    
    const request = await fetch(Global.url + "feed/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    //  console.log(await PeticionAjax(url, "GET"));

    if (datos.status === "success") {

      let newArticulos = datos.articulos;

      if(articulos.length >= 1){
        newArticulos = [...articulos, ...datos.articulos];
      }
      
      setArticulos(newArticulos);

      // Paginacion - condición no mostrar btn ver más
      if (!datos.pagination.hasNextPage) {
        setMore(false);
      }
    }
    setCargando(false);
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);

    conseguirArticulos(next);

    // console.log(page, users);
  }

  const confirmEliminar = async () => {

    //realizamos una peticion ajax con sus respectivos parametros
    const request = await fetch (Global.url + "articulo/" + idEliminar, {
      method: "DELETE",
      headers: {
        "Context-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    let datos = await request.json();
    
    if(datos.status === "success"){
      // guardamos en una lista todos los articulos que no sean el del id eliminado
      let articulosActualizados = articulos.filter(articulo => articulo._id !== idEliminar);
      setArticulos(articulosActualizados); // actualizamos el estado del componente padre (Articulos.jsx)

      // conseguirArticulos(1);
      setModConfirm(false); // cerramos el modal
      
      // Mostrar la tostada 
      setMostrarToast(true);
    }
  
  }

  // si la prop tienen un valor limite guardará solo esos articulos, sino guardará todos los articulos
  const articulosLimitados = maxArticulos ? articulos.slice(0, maxArticulos) : articulos;

  return ( 
    <div className="Articulos page " 
      style={{ padding: customPadding, width: customWidth, justifyContent: customJustify }}>

      <div className="content-articulos">

        {cargando ? (
          <div className="page-cargando">
            <h1 className='cerrar-texto'>Cargando</h1>
            <span className="loader-out" />
          </div>
        ) 
        :(

          articulos.length >= 1 ? (

            (articulosLimitados.map(cards => (

              <Listado 
                key={cards._id} cards={cards} 
                conseguirArticulos={conseguirArticulos}
                setIdEliminar={setIdEliminar} confirmEliminar={confirmEliminar}
              /> 
            )))
          )
          :(
            <h1>No hay articulos</h1> 
          )
        )}

      </div>

      {!maxArticulos && more &&            
        <button className="btn mt-10"  onClick={nextPage} >
          Ver más
        </button>
      }

      <button onClick={handleBtncrear} className='btn btn-crear btn-save'>
        Crear articulo
      </button>

      {btnCrear && <CrearArticulo setBtnCrear={setBtnCrear} />}
      
    </div>
  );
};

export default Articulos;
