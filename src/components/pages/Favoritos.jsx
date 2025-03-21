import React, {useState, useEffect} from 'react'
 ;
import { Link } from 'react-router-dom';
import "../../css/favoritos.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirFavoritos();
    }, []);

    const conseguirFavoritos = async () => {

        const url = BACKEND_URL + "usuario/favoritos";

        const request = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const datos = await request.json();

        if(datos.status === "success"){
            setFavoritos(datos.favoritos);
            setCargando(false);
        }
        else{
            console.log("error al conseguir los articulos favoritos");
        }
    };

    if(cargando){
        return(
            <div className="page-cargando">
                <h1 className='cerrar-texto'>Cargando</h1>
                <span className="loader-out" />
            </div>
        )
    }

  return (
    <div className='page-users'>
        
        <div className='content-users'> 

            <h2>{favoritos.length !== 0 ? "Tus articulos favoritos" : "No hay articulos favoritos" }</h2>

            {favoritos.map(favorito => (

                <div key={favorito._id} className='row-favs'>

                    <div className='img-favs' >
                        <img src={favorito.imagen !== "default.png" ?  BACKEND_URL + "ver-imagen/" + favorito._id : null}  alt="foto articulo" />
                    </div>

                    <div className='info-favs' >
                        <Link to={"/articulo/"+favorito._id} className='name-favs'>{favorito.titulo}</Link>

                    </div>

                </div>
            ))}
        
        </div>
    </div>
  )
}

export default Favoritos