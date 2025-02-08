import React from "react";
import { useState, useEffect } from "react";
import "../../css/articulos.css";
import { Listado } from "./Listado";
import CrearArticulo from "./CrearArticulo";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from '../../helpers/GlobalContext.jsx';
import { deleteArticle } from "../../helpers/deleteArticle.jsx";
import Toast from "../modals/Toast.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Articulos = ({ enPoint, customPadding, customWidth, customJustify, maxArticulos}) => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const [idEliminar, setIdEliminar] = useState(null);
  const [btnCrear, setBtnCrear] = useState(false);
  const location = useLocation();
  const { refreshKey } = useGlobalContext();
  const [tostada, setTostada] = useState(null);

  const handleBtncrear = () => {
    setBtnCrear(true);
  }

  useEffect(() => {
    
    setArticulos([]);
    setPage(1);
    setMore(true);
    conseguirArticulos(1);

  }, [location.pathname, enPoint, refreshKey]); // Dependencias actualizadas
  
  useEffect(() => {
    // Llamar a conseguirArticulos cada vez que se actualiza la página
    if (page > 1) {
      conseguirArticulos(page);
    }
  }, [page]); 

  const conseguirArticulos = async (nextPage) => {
    let url;

    switch(enPoint) {
      
      case "siguiendo":
        url = BACKEND_URL + "feed/" + nextPage;
        break;
      case "populares":
        url = BACKEND_URL + "mas-vistos/";
        break;
    
      default:
        break;
    } 

    if (location.pathname.includes("articulos")) {
      url = BACKEND_URL + "listar/" + nextPage;
    } else if (location.pathname.includes("feed")) {
      url = BACKEND_URL + "feed/" + nextPage;
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
    if (idEliminar) {
      deleteArticle(idEliminar, setArticulos);
    }
  };
  

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
                setIdEliminar={setIdEliminar} setArticulos={setArticulos}
                confirmEliminar={confirmEliminar} 
                
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
