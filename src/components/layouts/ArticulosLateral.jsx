import React, {useState, useEffect} from 'react';
import "../../css/artic_lateral.css";
import { Link } from 'react-router-dom';
// import { ArticulosContext } from '../../helpers/ArticulosContext';
import { Global } from '../../helpers/Global';
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { formatearTiempoRelativo } from '../../helpers/ConvertirFecha';


const ArticulosLateral = () => {
    // const { articulos } = useContext(ArticulosContext);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        conseguirArticulos();
    }, []);

    const conseguirArticulos = async () => {
        const url = Global.url + "listar";
    
        const {datos} = await PeticionAjax(url, "GET");
    
        if (datos.status === "success") {
          setArticulos(datos.articulos);
        }else{
          setArticulos([]);
        }
    };

 
  return (
    
    <div  className='art-lateral'>
    {articulos.slice(0, 6).map((articulo) => {

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
                 <Link to={"/articulo/"+articulo._id}>
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