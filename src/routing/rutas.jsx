import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Inicio  from "../components/pages/Inicio";
import Articulos from "../components/pages/Articulos";
import CrearArticulo from "../components/pages/CrearArticulo";
import { Busqueda } from "../components/pages/Busqueda";
import { VerArticulo } from "../components/pages/VerArticulo";
import EditarArticulo from "../components/pages/EditarArticulo";
import Login from "../components/pages/Login";
import RegistrarCuenta from "../components/pages/RegistrarCuenta";
import LayoutPublic from "../components/layouts/LayoutPublic";
import PrivateLayout from "../components/layouts/PrivateLayout";
import { AuthProvider } from "../helpers/AuthProvider";
import { CerrarSesion } from "../components/pages/CerrarSesion";
import { PerfilUser } from "../components/pages/PerfilUser";
import { Configuracion } from "../components/pages/Configuracion";
import { ExplorarUsers } from "../components/pages/ExplorarUsers";
import { Following } from "../components/pages/Following";
import { Followers } from "../components/pages/Followers";
import Favoritos from "../components/pages/Favoritos";

export const Rutas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        // Permitir acceso sin autenticación solo a estas rutas
        const rutasPublicas = ["/usuario/login", "/usuario/registrar-cuenta"];

        if (!token && !rutasPublicas.includes(location.pathname)) {
        navigate("/usuario/login");
        }
    }, [navigate, location]);

    return(

    <AuthProvider>
    
        <Routes>

            <Route path="/usuario" element={<LayoutPublic />} >
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="registrar-cuenta" element={<RegistrarCuenta />} />
            </Route>

            <Route path="/" element={<PrivateLayout />} >
                
                <Route index element={ <Inicio/> } />
                <Route path="inicio" element={ <Inicio /> } />
                <Route path="feed" element={ <Articulos /> } />
                <Route path="articulos" element={ <Articulos /> } />
                <Route path="crear-articulo" element={ <CrearArticulo/> } />
                <Route path="buscar/:busqueda" element={<Busqueda/>} />
                <Route path="articulo/:id" element={ <VerArticulo />} />
                <Route path="editar/:id" element={ <EditarArticulo />} />
                <Route path="logout" element={<CerrarSesion />} />
                <Route path="perfil/:id" element={<PerfilUser />} />
                <Route path="configuracion" element={<Configuracion />} />
                <Route path="explorar-users" element={<ExplorarUsers />} />
                <Route path="siguiendo/:userId" element={<Following />} />
                <Route path="seguidores/:userId" element={<Followers />} />
                <Route path="favoritos" element={<Favoritos />} />

            </Route>

            <Route path="*" element={
                <div className="jumbo page">
                    <h1>Error 404</h1>
                </div>
            } /> 

        </Routes>
    </AuthProvider>

    );
}