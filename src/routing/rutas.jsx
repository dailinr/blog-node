import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Inicio  from "../components/pages/Inicio";
import Articulos from "../components/pages/Articulos";
import Header from '../components/layouts/Header';
import Footer from "../components/layouts/Footer";
import CrearArticulo from "../components/pages/CrearArticulo";

export const Rutas = () => {

    return(

        <BrowserRouter>
        
            <Header />

            <section id="content" className="content">

                <Routes>
                    <Route path="/" element={ <Inicio/> }></Route>
                    <Route path="/inicio" element={ <Inicio /> }></Route>
                    <Route path="/articulos" element={ <Articulos /> }></Route>
                    <Route path="/crear-articulo" element={ <CrearArticulo/> }></Route>
                </Routes>

            </section>

            <Footer/>

        </BrowserRouter>
    );
}