import React, { useState } from 'react'
import '../../css/header.css';
import MenuUser from '../modals/MenuUser';
import { NavLink } from "react-router-dom";

const Header = () => {
    const [menuUsuario, setMenuUsuario] = useState(false);

    const mostrarOpcUser = () => {
        setMenuUsuario(!menuUsuario);
        console.log("menu usuario: " + menuUsuario);
    };

    

  return (
    <div className='header '>

        <div className='encabezado'>
            <div className='iconos-izq'>
                <i className='bx bx-revision'></i>
            </div>
            <div className='logo'>
                <div className='image-logo'></div>
            </div>

            <div className="iconos">
                <div className="icon-buscar">
                    <i className='bx bx-search-alt'></i>
                </div>
                <div className="icon-noti">
                    <i className='bx bxs-bell'></i>
                </div>
                <div className='icon-perfil'
                    onClick={mostrarOpcUser} >        
                    {menuUsuario && <MenuUser/>}
                </div>
            </div>
            
        </div>

        

        
        <ul className='navegacion'>
            <li><NavLink to="/inicio" className= "link ">Inicio</NavLink></li>
            <li><NavLink to="/articulos" className= "link ">Articulos</NavLink></li>
            <li><NavLink to="/crear-articulo" className= "link ">Crear articulo</NavLink></li>
        </ul>

        {/* <div className='buscador'>
            <input type="search" placeholder='buscar' />
        </div> */}
    </div>
  )
}

export default Header