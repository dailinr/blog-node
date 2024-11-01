import React from "react";
import { useState, useEffect } from "react";
import "../../css/articulos.css";
import { Global } from "../../helpers/Global";
import { Listado } from "./Listado";
import CrearArticulo from "./CrearArticulo";
import { useLocation } from "react-router-dom";

const Articulos = ({ enPoint, customPadding, customWidth, customJustify, maxArticulos}) => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const [idEliminar, setIdEliminar] = useState(null);
  const [btnCrear, setBtnCrear] = useState(false);
  const location = useLocation();

  const handleBtncrear = () => {
    setBtnCrear(true);
  }

  useEffect(() => {
    
    setArticulos([]);
    setPage(1);
    setMore(true);
    conseguirArticulos(1);

  }, [location.pathname, enPoint]); // Dependencias actualizadas
  
  useEffect(() => {
    // Llamar a conseguirArticulos cada vez que se actualiza la página
    if (page > 1) {
      conseguirArticulos(page);
    }
  }, [page]); 

  const conseguirArticulos = async (nextPage) => {
    let url;

    if (enPoint === "inicio") {
      url = `${Global.url}feed/${nextPage}`;
    } else if (location.pathname.includes("articulos")) {
      url = `${Global.url}listar/${nextPage}`;
    } else if (location.pathname.includes("feed")) {
      url = `${Global.url}feed/${nextPage}`;
    }
  
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });
  
    const datos = await request.json();
  
    if (datos.status === "success") {
      let newArticulos = nextPage === 1 ? datos.articulos : [...articulos, ...datos.articulos];
      setArticulos(newArticulos);
  
      // Controlar la paginación para mostrar el botón de ver más
      setMore(datos.pagination.hasNextPage);
    }
    setCargando(false);
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  }

  const confirmEliminar = async () => {

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

      setArticulos(articulosActualizados); // actualizamos el estado de articulos

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
        
        <p>articulos totales: {articulos.length}</p>

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
                setIdEliminar={setIdEliminar} confirmEliminar={confirmEliminar}
                setArticulos={setArticulos}
              /> 
            )))
          )
          :(
            <h1>No hay articulos</h1> 
          )
        )}

      </div>

      {!maxArticulos && more &&  articulos.length > 1 &&         
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
