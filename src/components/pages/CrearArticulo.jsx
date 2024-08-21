import React from "react";
import "../../css/crearArticulo.css";
import { useState } from "react";
import { useForm } from "../../helpers/hooks/useForm";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { Global } from "../../helpers/Global";

const CrearArticulo = () => {
  // metodos que se cambiaran conforme el usuario ingrese o envie datos
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("");

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;
    // console.log(nuevoArticulo)

    // Guardar articulo en backend -- parametros: url, metodo ajax, datos a guardar
    const { datos } = await PeticionAjax(
      Global.url + "crear",
      "POST",
      nuevoArticulo
    );

    if (datos.status === "success") {
      // si se sube exitosamente la imagen
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    // Subir la imagen
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

  return (
    <div className="pageCrear">
      
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <form className='formulario' onSubmit={guardarArticulo} >

        <h1 className='titulo-crear'> <i className='bx bx-notepad' /> &nbsp; Crear Articulo </h1>

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label> <br/>
          <input type="text" name='titulo' onChange={cambiado} 
          className="input input-bordered input-md w-full max-w-xs"/>
        </div>

        <div className='form-group'>
          <label htmlFor='etiqueta'>Etiqueta del tema</label> <br/>
          <input type="text" name='etiqueta' onChange={cambiado} 
          className="input input-bordered input-md w-full max-w-xs"/>
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label> <br/>
          <textarea type="text" name='contenido' onChange={cambiado} 
          className="textarea textarea-bordered textarea-sm w-full max-w-xs" />
        </div>

        <div className='form-group'>
          <label htmlFor='file0' />
          <input type="file" name='file0' id="file"
           className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-active" />
      </form> 

      <strong style={{ width: "100px" }}>
        {resultado === "guardado" ? (
          <div className="toast rounded-lg w-48 h-16  bg-[#008000] text-[#ffffff]">
            <div className="flex flex-row w-full gap-5  items-center px-4 w-full h-full">
              <div className="my-auto text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-check-circle"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
              </div>
              <div>
                <div class="font-bold text-sm">Articulo creado</div>
              </div>
            </div>
          </div>
        ) : null}
      </strong>

      <strong style={{ width: "100px" }}>
        {resultado === "error" ? (
          <div className="toast rounded-lg w-48 h-16  bg-[#e5202a] text-[#ffffff]">
            <div className="flex flex-row w-full gap-5  items-center px-4 w-full h-full">
              <div className="my-auto text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-alert-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
              </div>
              <div>
                <div class="font-bold text-sm">Faltan datos </div>
              </div>
            </div>
          </div>
        ) : null}
      </strong>
    </div>
  );
};

export default CrearArticulo;
