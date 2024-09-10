import React from "react";
import "../../css/crearArticulo.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../helpers/hooks/useForm";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
import Tostada from "../modals/Tostada";
import ToastError from "../modals/ToastError";

const EditarArticulo = () => {
  const { formulario, enviado, cambiado, setFormulario } = useForm({});
  const [resultado, setResultado] = useState("");
  const [articulo, setArticulo] = useState({});
  const { id }  = useParams();
 
  // peticion ajax a la DB para listar todos los articulos
  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    const url = Global.url + "articulo/"+ id;

    const {datos} = await PeticionAjax(url, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
      setFormulario(datos.articulo); // Inicializa el formulario con los datos obtenidos
    }

  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;
    // console.log("Datos enviados:", nuevoArticulo); // Revisa si ahora captura todos los campos


    // Guardar articulo en backend -- parametros: url, metodo ajax, datos a guardar
    const { datos } = await PeticionAjax(
      Global.url + "articulo/"+id,
      "PUT",
      nuevoArticulo
    );
    
    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    // Subir la imagen si se ha seleccionado una
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      // añadimos la imagen subida al formData
      formData.append("file0", fileInput.files[0]); // se le asigna el archivo con el primero

      // nueva peticion ajax para la ruta de subir imagen
      const subida = await PeticionAjax(
        Global.url + "subir-imagen/" + datos.articulo._id,
        "POST",
        formData,
        true
      );
      // console.log(subida.datos); 

      if (subida.datos.status === "success") {
        setResultado("guardado");
        
      } else {
        setResultado("error");
      }
    }

    // console.log(datos);
  };

   // Conseguir url de la imagen del articulo
   let urlImagen = articulo.imagen !== "default.png" ?
   Global.url + "ver-imagen/" + articulo.imagen : articulo.imagen;


  return (
    
    <div className="form-overlay" >
      
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <form className='formulario ' onSubmit={editarArticulo} >

        <h1 className='titulo-crear'> 
          <i className='bx bx-notepad'/> &nbsp; Editar Articulo 
          <Link to={"/inicio"}  style={{marginLeft: 'auto', marginRight: '0'}} > <i className='bx bx-x' /> </Link>
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
          <Link to={"/inicio"}> <input type="submit" value="Cancelar" className="btn btn-active" /> </Link>
          <input type="submit" value="Guardar" className="btn btn-save" />
          
        </div>
      </form> 

      {resultado === 'guardado' && <Tostada width="100" mensaje={"Articulo guardado"} />}
      {resultado === 'error' && <ToastError width="100" mensaje={"Faltan datos"} />}
      
    </div>
  );
}

export default EditarArticulo