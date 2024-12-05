import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../helpers/hooks/useAuth'
import "../../css/animaciones.css";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  
  if(loading){

    return (
      <div className="page-cargando">
        <span className="loader" />
      </div>
    );
  }
  // Modificación: Asegurar que la autenticación se verifica correctamente
  if (!auth  && loading) {
    return <Navigate to="/usuario/login" />;
  }

  return (
    <>
      <Header />

      <section className="content" >
        <Outlet  />
      </section>

      <Footer />
    </>
  );
  
};

export default PrivateLayout