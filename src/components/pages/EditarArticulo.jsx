import React from "react";
import "../../css/crearArticulo.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../helpers/hooks/useForm";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
import Toast from "../modals/Toast";

const EditarArticulo = () => {
  
  const { formulario, enviado, cambiado, setFormulario } = useForm({});
  const [tostada, setTostada] = useState(null);
  const [type, setType] = useState(null);
  const [articulo, setArticulo] = useState({});
  const { id }  = useParams();
 
  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulo();
  }, [])

  useEffect(() => {

    if (tostada) {
      const timer = setTimeout(() => {
        setTostada(null);
        setType(null);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [tostada, type]);

  const conseguirArticulo = async () => {
    const url = Global.url + "articulo/"+ id;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const datos = await request.json();

    if (datos.status === "success") {
      setArticulo(datos.articulo);
      setFormulario(datos.articulo); // Inicializa el formulario con los datos obtenidos
    }

  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;

    // Guardar articulo en backend -- parametros: url, metodo ajax, datos a guardar
    const { datos } = await PeticionAjax(
      Global.url + "articulo/"+id,
      "PUT",
      nuevoArticulo
    );

    // Subir la imagen si se ha seleccionado una
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {

      const formData = new FormData();
      // añadimos la imagen subida al formData
      formData.append("file0", fileInput.files[0]); // se le asigna el archivo con el primero

      // nueva peticion ajax para la ruta de subir imagen
      const subida = await fetch(Global.url + "subir-imagen/" + datos.articulo._id, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      const subidaData = await subida.json();

      console.log(subidaData);

      if (subidaData.status === "success") {
        setTostada("¡Articulo actualizado!");
        setType("exito");
      }
      else {
        setTostada("¡Error al actualizar articulo!");
        setType("error");
      }
    }
    else if (datos.status === "success") {
      setTostada("¡Articulo actualizado!");
      setType("exito");
    } 
    else {
      setTostada("¡Error al actualizar articulo!");
      setType("error");
    }
  };

  // Conseguir url de la imagen del articulo
  let urlImagen = articulo.imagen !== "default.png" ?
  Global.url + "ver-imagen/" + articulo.imagen : articulo.imagen;


  return (
    
    <div className="form-overlay">
      
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <form className='formulario ' onSubmit={editarArticulo} >

        <h1 className='titulo-crear'> 
          <i className='bx bx-notepad'/> &nbsp; Editar Articulo 
          <Link to={"/articulo/"+articulo._id}  style={{marginLeft: 'auto', marginRight: '0'}} > <i className='bx bx-x' /> </Link>
        </h1>

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label> <br/>
          <input type="text" name='titulo' onChange={cambiado} value={formulario.titulo || ""}
          className="input input-bordered input-md w-full max-w-xs"/>
        </div>

        <div className='form-group'>
          <label htmlFor='etiqueta'>Etiqueta del tema</label> <br/>
          <input type="text" name='etiqueta' onChange={cambiado} value={formulario.etiqueta || ""}
          className="input input-bordered input-md w-full max-w-xs"/>
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label> <br/>
          <textarea type="text" name='contenido' onChange={cambiado} value={formulario.contenido || ""}
          className="textarea textarea-bordered textarea-sm w-full max-w-xs" />
        </div>

        <div className='form-group'>
          <label htmlFor='file0' />
          <div className='imagen-articulo border-2 mb-1' style={{width: '150px'}}>
            <img src={urlImagen} alt={articulo.titulo} />
          </div>

          <input type="file" name='file0' id="file" 
           className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
        </div>

        <div className="botones">
          <Link to={"/articulo/"+articulo._id}> <input  type="submit" value="Cancelar" className="btn btn-active" /> </Link>
          <input type="submit" value="Guardar" className="btn btn-save" />
          
        </div>
      </form> 

      {tostada && type && (
        type == "error" ? 
          <Toast mensaje={tostada} background="#c0131b" type={type} />
        :
        ((type == "exito") && 
          <Toast mensaje={tostada} background="green" type={type} />
        )
      )}
    </div>
  );
}

export default EditarArticulo