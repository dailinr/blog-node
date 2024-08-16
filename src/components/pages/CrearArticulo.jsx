import React from 'react';
import "../../css/crearArticulo.css";
import { useState } from 'react';
import { useForm } from '../../helpers/hooks/useForm';
import { PeticionAjax } from '../../helpers/PeticionAjax';
import { Global } from '../../helpers/Global';


const CrearArticulo = () => {

  // metodos que se cambiaran conforme el usuario ingrese o envie datos
  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState("");

  const guardarArticulo = async(e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;
    // console.log(nuevoArticulo)

    // Guardar articulo en backend -- parametros: url, metodo ajax, datos a guardar
    const {datos, cargando} = await PeticionAjax(Global.url + "crear", "POST", nuevoArticulo);

    if(datos.status === "success"){
      setResultado("guardado");
      
      // Subir la imagen
      const fileInput = document.querySelector("#file");

      const formData = new FormData();
      // añadimos la imagen subida al formData
      formData.append("file0", fileInput.files[0]); // se le asigna el archivo con el primero

      // nueva peticion ajax para la ruta de subir imagen
      const subida = await PeticionAjax(Global.url+"subir-imagen/" + datos.articulo._id, "POST", formData, true);
      // console.log(subida.datos);
      
      if(subida.status === "success"){ // si se sube exitosamente la imagen
        setResultado("guardado");
      }
      else{
        setResultado("error");
      }

    }else{
      setResultado("error");
    }

    // console.log(datos);
  }

  return (
    <div className='pageCrear'> 

      <h1 className='titulo-crear'>Crear Articulo</h1>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      {/* CREAR FORMULARIO */}

      <form className='formulario' onSubmit={guardarArticulo} >

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label> <br/>
          <input type="text" name='titulo' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='etiqueta'>Etiqueta del tema</label> <br/>
          <input type="text" name='etiqueta' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label> <br/>
          <textarea type="text" name='contenido' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'></label> <br/>
          <input type="file" className="file-input w-full max-w-xs" name='file0' id="file" />
        </div>

        <input type="submit" value="Guardar" className='btn' />
      </form>

      <strong>
        { (resultado === "guardado") ?
          "Articulo guardado con exito!!" :
          "Error al guardar el articulo" }
      </strong>

    </div>
  )
}

export default CrearArticulo