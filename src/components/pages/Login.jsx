import React, {useEffect, useState} from 'react'
import "../../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../helpers/hooks/useForm'
 
import useAuth from '../../helpers/hooks/useAuth'
import Toast from '../modals/Toast'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const { formulario, cambiado } = useForm({});
    const navigate = useNavigate(); // Importa y usa useNavigate
    const [tostada, setTostada] = useState(null);
    const [type, setType] = useState(null);

    const {auth, loading, authUser } = useAuth();

    useEffect(() => {

        if (auth?._id && !loading) {  // Asegura que auth tiene datos antes de redirigir
            
            // console.log("Estado actual de auth:", auth);
            // console.log("Estado actual de loading:", loading);

            setTostada("¡Usuario logeado!");
            setType("exito");
            
            // Esperar un breve tiempo antes de redirigir
            setTimeout(() => {
                navigate("/inicio");
            }, 1000);
        }
    }, [auth, loading]);

    useEffect(() => {

        if (tostada) {
          const timer = setTimeout(() => {
            setTostada(null);
            setType(null);
          }, 3000); // 3 segundos
    
          return () => clearTimeout(timer);
        }
    }, [tostada, type]);

    const loginUser = async (e) => {
        e.preventDefault();

        let datosUser = formulario;
        try{
            const url = BACKEND_URL + "usuario/login";

            const request = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosUser)
            })

            if(!request.ok){
                throw new Error('Error al iniciar sesión');
            }

            const datos = await request.json();
            console.log(datos);
            
            if(datos.status === "success"){
                // Persistir los datos en el localstorage - guardar una sesion
                localStorage.setItem("token", datos.token);
                localStorage.setItem("user", JSON.stringify(datos.user)); 

                // Setear datos del usuario en el auth
                await authUser();
            }
        }
        catch(error){
            setTostada("¡Error al iniciar sesion!");
            setType("error");
            console.error('Error al iniciar sesión:');
        }        
    }

  return (
    
    <div className="page-login">
        
        {tostada && type && (
            type == "error" ? 
                <Toast mensaje={tostada} background="#c0131b" type={type} />
            :
            ((type == "exito") && 
                <Toast mensaje={tostada} background="green" type={type} />
            )
        )}

        <div className="login flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 md:pt-1 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className='flex flex-col mx-auto'>
                <img src={`${import.meta.env.BASE_URL}TecnoPulse-removebg-preview.png`} alt="" width="180" />

            </div>
            <form className="flex flex-col" onSubmit={loginUser}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                        </span> 
                        <input type="password" name="password" onChange={cambiado} id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" data-listener-added_5995265e="true" />
                    </div>
                </div>
                <input  type="submit" value="Login" className="w-full text-[#FFFFFF] bg-[#1e1e25] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6" />
                <div className="text-sm font-light text-[#6B7280] ">Don't have an accout yet? <Link to={"/usuario/registrar-cuenta"} className="font-medium text-[#1e1e25] hover:underline">Sign Up</Link>

                </div>
            </form>
            {/* <div className="relative flex py-8 items-center">
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
            </form> */}
        </div>
    </div>
  )
}

export default Login