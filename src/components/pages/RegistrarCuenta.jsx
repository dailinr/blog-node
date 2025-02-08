import React, {useEffect, useState} from 'react'
import "../../css/login.css"
import { Link } from 'react-router-dom'
import { useForm } from '../../helpers/hooks/useForm'
import { PeticionAjax } from '../../helpers/PeticionAjax'
import { Global } from '../../helpers/Global'
import Toast from '../modals/Toast'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const RegistrarCuenta = () => {
    const { formulario, cambiado } = useForm({});
    const [tostada, setTostada] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {

        if (tostada) {
          const timer = setTimeout(() => {
            setTostada(null);
            setType(null);
          }, 3000); // 3 segundos
    
          return () => clearTimeout(timer);
        }
    }, [tostada, type]);

    const saveUser = async (e) => {
        e.preventDefault();

        // Recoger datos del formulario
        let newUser = formulario;

        // Llamar al helper PeticionAjax para hacer la petición al backend
        const url = BACKEND_URL + "usuario/registrar";

        const { datos } = await PeticionAjax(url, "POST", newUser);


        if (datos.status === "success") {
            setTostada("¡Usuario registrado!");
            setType("exito");
        } 
        else {
            setTostada("¡Error al registrar el usuario!");
            setType("error");
        }
    }


  return (

    <div className='page-login'>

        {tostada && type && (
            type == "error" ? 
                <Toast mensaje={tostada} background="#c0131b" type={type} />
            :
            ((type == "exito") && 
                <Toast mensaje={tostada} background="green" type={type} />
            )
        )}

        <div className="registrar flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 md:pt-1 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl" >
            <div className='flex flex-col mx-auto'>
                <img src="../../../TecnoPulse-removebg-preview.png" alt="" width="180" />

            </div>
            <form className="flex flex-col" onSubmit={saveUser}>
                <div className="pb-2 flex flex-col md:flex-row md:space-x-4">

                    <div className="flex flex-col w-full md:w-1/2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#111827]">Nombre</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </span>
                            <input type="text" name="name" onChange={cambiado} id="name" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Tu nombre" autoComplete="off" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-[#111827]">Apellido</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </span>
                            <input type="text" name="surname" onChange={cambiado} id="surname" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Tu apellido" autoComplete="off" />
                        </div>
                    </div>
                </div>

                <div className="pb-2">
                    <label htmlFor="nick" className="block mb-2 text-sm font-medium text-[#111827]">Username</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-at-sign"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                        </span> 
                        <input type="text" name="nick" onChange={cambiado} id="nick" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="username23" autoComplete="off" />
                    </div>
                </div>
                <div className="pb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                        </span> 
                        <input type="email" name="email" onChange={cambiado} id="email" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" autoComplete="off" />
                    </div>
                </div>
                <div className="pb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                        </span> 
                        <input type="password" name="password" onChange={cambiado} id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" />
                    </div>
                </div>
                <input type="submit" value="Registrate" className="w-full text-[#FFFFFF] bg-[#1E1E25] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6" />
                <div className="text-sm mx-auto font-light text-[#6B7280] ">Already have an account? <Link to={"/usuario/login"} className="font-medium text-[#1E1E25] hover:underline">Login</Link>

                </div>
            </form>

            <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-[1px] border-gray-200"></div> <span className="flex-shrink mx-4 font-medium text-gray-500">OR</span> 
                <div className="flex-grow border-t border-[1px] border-gray-200"></div>
            </div>
            <form>
                <div className="flex flex-row gap-2 justify-center">
                    <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg> <span className="font-medium mx-auto">Github</span>

                    </button>
                    <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg> <span className="font-medium mx-auto">Twitter</span>

                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegistrarCuenta