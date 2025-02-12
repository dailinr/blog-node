import React, { useState } from 'react'
import '../../css/header.css';
import MenuUser from '../modals/MenuUser';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../helpers/hooks/useAuth';
import { useGlobalContext } from '../../helpers/GlobalContext';
import { Notificaciones } from '../modals/Notificaciones';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
    
    const [buscar, setBuscar] = useState("");
    const navegar = useNavigate();
    const { auth } = useAuth();
    const { refreshPage, modales, setModales } = useGlobalContext();

    const abrirModalNotificaciones = (e) => {
        e.stopPropagation(); // Evita el cierre al hacer clic dentro del modal
        setModales({ notificaciones: !modales.notificaciones, menuUsuario: false , menuToggle: false});
    };

    const abrirModalUsuario = (e) => {
        e.stopPropagation(); // Evita el cierre al hacer clic dentro del modal
        setModales({ menuUsuario: !modales.menuUsuario, notificaciones: false, menuToggle: false});
    };

    const abrirMenuToggle = (e) => {
        e.stopPropagation();
        setModales({ menuToggle: !modales.menuToggle, notificaciones: false, menuUsuario: false});
    }

    const avatarDefault = `${import.meta.env.BASE_URL}default-avatar-profile-icon-of-social-media-user-vector.jpg`;
    let urlImagen
    if(!auth){
        urlImagen = avatarDefault;
    }
    else{
        urlImagen =  auth.image  === "default.png" ? 
        avatarDefault : BACKEND_URL + "usuario/avatar/" + auth.image;
    }

    const hacerBusqueda = (e) => {
        e.preventDefault();

        const searchValue = e.target.value; // Obtén el valor del input
        setBuscar(searchValue);

        if (!searchValue.trim()) { // Verifica si esté vacío
            navegar("/inicio");
        }
        else{
            navegar("/buscar/" + searchValue, { replace: true }); // para cambiar la ruta por la busqueda actual
        }
    };
    
 
  return (
    <div className='header '>    
    
        <div className='logo' 
            style={{ background: `url(${import.meta.env.BASE_URL}TecnoPulse-removebg-preview.png) no-repeat center / cover`, width: '180px', height: '60px'}} > 
            <div className='image-logo'></div>
        </div>

        <ul className='navegacion'>
            
            <li>
                <NavLink  to="/inicio" className={({ isActive }) => isActive ? "link active" : "link"}>
                    Inicio
                </NavLink>
            </li>
            <li>
                <NavLink to="/feed" className={({ isActive }) => isActive ? "link active" : "link"}>
                    Siguiendo
                </NavLink>
            </li>
            <li>
                <NavLink to="/articulos" className={({ isActive }) => isActive ? "link active" : "link"} >
                    Articulos
                </NavLink>
            </li>
            <li>
                <NavLink to="/explorar-users" className={({ isActive }) => isActive ? "link active" : "link"}>
                    Explorar usuarios
                </NavLink>
            </li>
        </ul>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <div className="pos-f-t">
            <button className="menu-toggle" onClick={abrirMenuToggle}>
                ☰
            </button>
            <div className={`menu-collapse ${modales.menuToggle ? "open" : ""}`}>
                <ul>
                    <li><NavLink to="/inicio">Inicio</NavLink></li>
                    <li><NavLink to="/feed">Siguiendo</NavLink></li>
                    <li><NavLink to="/articulos">Artículos</NavLink></li>
                    <li><NavLink to="/explorar-users">Explorar usuarios</NavLink></li>
                </ul>
            </div>
        </div>

        <div className="iconos">
            {/* <div className="icon-buscar">
                <i className='bx bx-search-alt'></i>
            </div> */}

            <div onClick={refreshPage} className='icon-recargar' style={{alignContent: "center"}}>
                <i className='bx bx-revision' />
            </div> 

            <label className="input search input-bordered flex items-center gap-2">
                <input  onChange={(e) => hacerBusqueda(e)}
                    type="text" id="search_field" className="grow input-search" placeholder="Buscar articulo" 
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
            </label>

            <div className="icon-noti" onClick={abrirModalNotificaciones}>
            
                <i className='bx bxs-bell'></i>
                
                {auth ? (
                   modales.notificaciones && <Notificaciones idUser={auth._id} /> 
                ):
                    navegar("/usuario/login")
                }
            </div>
            
            <div className='icon-perfil' onClick={abrirModalUsuario}
                style={{ background: `url(${urlImagen}) no-repeat center / cover` }} >
                
                {modales.menuUsuario && <MenuUser/>}
            </div>

        </div>
        
    </div>
  )
}

export default Header