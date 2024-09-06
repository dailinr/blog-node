import React, { useState } from 'react'
import '../../css/header.css';
import MenuUser from '../modals/MenuUser';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [menuUsuario, setMenuUsuario] = useState(false);
    const [buscar, setBuscar] = useState("");
    const navegar = useNavigate();

    const mostrarOpcUser = () => {
        setMenuUsuario(!menuUsuario);
        console.log("menu usuario: " + menuUsuario);
    };

    const hacerBusqueda = (e) => {
        e.preventDefault();
        const searchInput = e.currentTarget.querySelector("input"); // Busca el input dentro del label
        let searchValue = searchInput ? searchInput.value : ""; // Verifica si el input existe y obtiene su valor
        setBuscar(searchValue);
        console.log("Estás buscando: " + searchValue);
        navegar("/buscar/"+searchValue, {replace: true}); // para cambiar la ruta por la busqueda actual
    }


  return (
    <div className='header '>

        
        {/* <div className='iconos-izq'>
            <i className='bx bx-revision'></i>
            
        </div> */}
        <div className='logo'>
            <div className='image-logo'></div>
        </div>

        <ul className='navegacion'>
            <li><NavLink to="/inicio" ctiveClassName="active" className= "link ">Inicio</NavLink></li>
            <li><NavLink to="/articulos" ctiveClassName="active" className= "link ">Articulos</NavLink></li>
            <li><NavLink to="/articulos" ctiveClassName="active" className= "link ">Tendencias</NavLink></li>
        </ul>

        <div className="iconos">
            {/* <div className="icon-buscar">
                <i className='bx bx-search-alt'></i>
            </div> */}

            <label onChange={hacerBusqueda} className="input search input-bordered flex items-center gap-2">
                <input type="text" id="search_field" className="grow" placeholder="Search" />
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

            <div className="icon-noti">
                <i className='bx bxs-bell'></i>
            </div>
            <div className='icon-perfil'
                onClick={mostrarOpcUser} >        
                {menuUsuario && <MenuUser/>}
            </div>
            
            
        </div>
        
        

        {/* <div className='buscador'>
            <input type="search" placeholder='buscar' />
        </div> */}
    </div>
  )
}

export default Header