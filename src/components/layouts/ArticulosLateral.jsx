import React, {useState, useEffect} from 'react';
import "../../css/artic_lateral.css";
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { formatearTiempoRelativo } from '../../helpers/ConvertirFecha';
import { incrementarVistas } from '../../helpers/incrementarVistas';
import useAuth from '../../helpers/hooks/useAuth';


const ArticulosLateral = () => {
    
    const {auth} = useAuth();
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        conseguirArticulos(false);
    }, []);

    const conseguirArticulos = async (showNews = false) => {

        if(showNews){
            setArticulos([]);
        }

        const url = Global.url + "listar";
    
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
    };

 
  return (
    
    <div  className='art-lateral'>

      <div className='icon-recargar' onClick={() => conseguirArticulos(true)}
        style={{position: "absolute", top: "10px", right: "0"}}>
        <i className='bx bx-revision' />
      </div>

    <h4 className='titulo-recientes'>Recientes</h4>
    
    {articulos.slice(0, 10).map((articulo) => {

        let urlImagen = articulo.imagen !== "default.png"  ?
        Global.url + "ver-imagen/" + articulo.imagen : articulo.imagen;

          
        return(

        <article key={articulo._id} className='card-lat'>

            <div className='image-lat'
                style={{
                    background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url(${urlImagen}) no-repeat center / cover`
                }}>
            </div>

            <div className='cont-card-lat'>
                <div className=' label-lat '>{articulo.etiqueta}</div>

                <div className='titulo-lat'>
                 
                 <Link to={"/articulo/"+articulo._id}
                    onClick={articulo.user._id != auth._id ? () => incrementarVistas(articulo._id, setArticulos): null}>
                    <h5>{articulo.titulo} </h5>
                 </Link>
                 
                </div>
                
                <div className='fecha-lat'>
                    <p className="fecha-card" style={{fontSize: 'small'}}>
                        <i className='bx bx-calendar'/>{formatearTiempoRelativo(articulo.fecha)}
                    </p>
                </div>
            </div>

        </article>

        
        );
    })}
    </div> 

  )
}

export default ArticulosLateral;