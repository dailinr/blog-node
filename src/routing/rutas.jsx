import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Inicio  from "../components/pages/Inicio";
import Articulos from "../components/pages/Articulos";
import Header from '../components/layouts/Header';
import Footer from "../components/layouts/Footer";
import CrearArticulo from "../components/pages/CrearArticulo";
import { Busqueda } from "../components/pages/Busqueda";
import { VerArticulo } from "../components/pages/VerArticulo";
import EditarArticulo from "../components/pages/EditarArticulo";
import Login from "../components/pages/Login";
import RegistrarCuenta from "../components/pages/RegistrarCuenta";

export const Rutas = () => {
    const location = useLocation();

    return(

        <>
        
            {(location.pathname !== '/login' && location.pathname !== '/registrar-cuenta') && <Header />}

            <section id="content" className="content">

                <Routes>
                    <Route path="/" element={ <Inicio/> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/registrar-cuenta" element={ <RegistrarCuenta /> } />
                    <Route path="/inicio" element={ <Inicio /> } />
                    <Route path="/articulos" element={ <Articulos /> } />
                    <Route path="/crear-articulo" element={ <CrearArticulo/> } />
                    <Route path="/buscar/:busqueda" element={<Busqueda/>} />
                    <Route path="/articulo/:id" element={ <VerArticulo />} />
                    <Route path="/editar/:id" element={ <EditarArticulo />} />

                    <Route path="*" element={
                        <div className="jumbo page">
                            <h1>Error 404</h1>
                        </div>
                    } />

                </Routes>

            </section>

            {(location.pathname !== '/login' && location.pathname !== '/registrar-cuenta') && <Footer />}

        </>
    );
}