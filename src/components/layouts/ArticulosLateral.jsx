import React, {useContext} from 'react';
import "../../css/artic_lateral.css";
import { ArticulosContext } from '../../helpers/ArticulosContext';
import { Global } from '../../helpers/Global';


const ArticulosLateral = () => {
    const { articulos } = useContext(ArticulosContext);

  return (
    articulos.map((articulo) => {

        let urlImagen = articulo.imagen !== "default.png"  ?
        Global.url + "ver-imagen/" + articulo.imagen : articulo.imagen;

        return(

        <div  className='art-lateral'>
            
            <article key={articulo._id} className='card-lat'>

                <div className='image-lat'
                    style={{
                        background: `linear-gradient(to top, rgba(0, 0, 0, 0.199), rgba(58, 58, 58, 0.178)), url(${urlImagen}) no-repeat center / cover`
                    }}>
                </div>

                <div className='cont-card-lat'>
                    <div className=' label-lat '>{articulo.etiqueta}</div>

                    <div className='titulo-lat'>
                        <h5>{articulo.titulo} </h5>
                    </div>
                    
                </div>

            </article>

        </div> 
        
        );
    })

  )
}

export default ArticulosLateral;