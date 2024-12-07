import React, { useState } from 'react'
import "../../css/config.css";
import useAuth from '../../helpers/hooks/useAuth';
import { Global } from '../../helpers/Global';
import { SerializeForm } from '../../helpers/SerializeForm';
import Tostada from '../modals/Tostada';
import ToastError from '../modals/ToastError';

export const Configuracion = () => {

  const {auth, setAuth} = useAuth();
  const [saved, setSaved] = useState("not_saved");
  const [cargando, setCargando] = useState(true);

  setTimeout(() => {
    setCargando(false);
  }, 100);

  const updateUser = async(e) => {
    e.preventDefault();

    // token de autenticacion
    const token = localStorage.getItem("token");

    let newDataUser = SerializeForm(e.target);
    delete newDataUser.file0; // borramos el campo de la imagen

    // Actualizar usuario en la base de datos
    const request = await fetch(Global.url + "usuario/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    if(data.status == "success" && data.user){

      delete data.user.password;
      setAuth(data.user);
      setSaved("saved");
    }
    else{
      setSaved("error")
    }

    // Subida de imagenes
    const fileInput = document.querySelector("#file");

    if(data.status == "success" && fileInput.files[0]){

      // Recoger fichero a subir
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      // Peticion para enviar el fichero
      const uploadRequest = await fetch(Global.url + "usuario/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });

      const uploadData = await uploadRequest.json();

      if(uploadData.status == "success" && uploadData.user){
        delete uploadData.user.password;

        setAuth(uploadData.user);
        setSaved("saved")
      }
      else{
        setSaved("error")
      }
    }
  }

  const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";

  let urlImagen = auth.image === "default.png" ? 
    avatarDefault : Global.url + "usuario/avatar/" + auth.image;

  return (
    <div className='page-confi'>

      {!cargando ? (
        <>
        <form className='form-update' onSubmit={updateUser}>
          
          <div className='upload-file'>
            <label htmlFor="file0"></label>
            
            <div className='editar-icon'
              style={{ background: `linear-gradient(to top, rgba(0, 0, 0, 0.429), rgba(58, 58, 58, 0.429)), url(${urlImagen}) no-repeat center / cover` }} >
              
              <div className='text-icon'>
                <i className='bx bxs-camera' />
                <p>click para cambiar foto de perfil</p>
              </div>

              <input type="file" name="file0" id="file" />
            </div>
          </div>

          <div className='editar-datos'>
            <h2>Datos del usuario</h2>

            <div className="pt-4 flex flex-col" >
              <div className="pb-2 flex flex-col md:flex-row md:space-x-4">

                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#111827]">Nombre</label>
                  <div className="relative text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    <input type="text" name="name" id="name" defaultValue={auth.name}  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Tu nombre" autoComplete="off" />
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="surname" className="block mb-2 text-sm font-medium text-[#111827]">Apellido</label>
                  <div className="relative text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    <input type="text" name="surname"  id="surname" defaultValue={auth.surname}  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Tu apellido" autoComplete="off" />
                  </div>
                </div>
              </div>

              <div className="pb-2">
                <label htmlFor="biografia" className="block mb-2 text-sm font-medium text-[#111827]">Biografia</label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <input type="text" name="biografia"  id="biografia" defaultValue={auth.biografia}  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Tu biografia" autoComplete="off" />
                </div>
              </div>

              <div className="pb-2">
                <label htmlFor="nick" className="block mb-2 text-sm font-medium text-[#111827]">Username</label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-at-sign"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                  </span> 
                  <input type="text" name="nick"  id="nick" defaultValue={auth.nick} className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="username23" autoComplete="off" />
                </div>
              </div>

              <div className="pb-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </span> 
                  <input type="email" name="email" id="email" defaultValue={auth.email} className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" autoComplete="off" />
                </div>
              </div>

              <div className="pb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                <div className="relative text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  </span> 
                  <input type="password" name="password"  id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" />
                </div>
              </div>

              <input type="submit" value="Update" className="w-full text-[#FFFFFF] bg-[#1E1E25] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-3" />
              
            </div>

          </div>

        </form>

        {saved === 'saved' && <Tostada width="100" mensaje={"Usuario actualizado"} />}
        {saved === 'error' && <ToastError width="100" mensaje={"Faltan datos"} />}
        </>
      )
      :(
        <div className="page-cargando">
          <h1 className='cerrar-texto'>Cargando</h1>
          <span className="loader-out" />
        </div>
      )}
    </div>
  )
}
