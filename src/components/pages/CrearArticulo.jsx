import React, { useEffect } from "react";
import "../../css/crearArticulo.css";
import { useState } from "react";
import { useForm } from "../../helpers/hooks/useForm";
// import { PeticionAjax } from "../../helpers/PeticionAjax";
import { useNavigate } from "react-router-dom";
import useAuth from "../../helpers/hooks/useAuth";
import Toast from "../modals/Toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CrearArticulo = ({ setBtnCrear }) => {
  // metodos que se cambiaran conforme el usuario ingrese o envie datos
  const { formulario, enviado, cambiado } = useForm({});
  const [tostada, setTostada] = useState(null);
  const [type, setType] = useState(null);
  const {auth} = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const cerrarModal = () => {
    setBtnCrear(false);
  }
  
  useEffect(() => {
    if(!auth){
      navigate("/usuario/login");
    }
  }, []);

  useEffect(() => {

    if (tostada) {
      const timer = setTimeout(() => {
        setTostada(null);
        setType(null);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [tostada, type]);

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario;
    nuevoArticulo.user = auth._id;

    // Guardar articulo en backend -- parametros: url, metodo ajax, datos a guardar
    const request = await fetch(BACKEND_URL + "crear", {
      method: "POST",
      body: JSON.stringify(nuevoArticulo),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    if (data.status === "success") {
      // si se sube exitosamente la imagen
      setTostada("¡Articulo creado!");
      setType("exito");
    } 
    else {
      setTostada("¡Error al crear articulo!");
      setType("error");
    }

    // Subir la imagen
    const fileInput = document.querySelector("#file");

    if (data.status === "success" && fileInput.files[0]) {

      const formData = new FormData();
      // añadimos la imagen subida al formData
      formData.append("file0", fileInput.files[0]); // se le asigna el archivo con el primero

      // nueva peticion ajax para la ruta de subir imagen
      const subida = await fetch(BACKEND_URL + "subir-imagen/" + data.articulo._id, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });

      const subidaData = await subida.json();

      if (subidaData.status === "success") {
        setTostada("¡Articulo creado!");
        setType("exito");
      } 
      else {
        setTostada("¡Error al crear articulo!");
        setType("error");
      }
    }
    
    // Limpiar formulario
    const myForm = document.querySelector("#articulo-form");
    myForm.reset();
  };


  return (
    auth && (

    <div className="form-overlay" >
      
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <form id="articulo-form" className='formulario ' onSubmit={guardarArticulo} >
      
        <h1 className='titulo-crear'> 
          <i className='bx bx-notepad'/> &nbsp; Crear Articulo 
          
          <i className='bx bx-x' onClick={cerrarModal} 
          style={{marginLeft: 'auto', marginRight: '0', cursor: 'pointer'}} /> 
        </h1>

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

        <div className="botones">
          <input onClick={cerrarModal} type="submit" value="Cancelar" className="btn btn-active" />
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
    )

  );
};

export default CrearArticulo;
