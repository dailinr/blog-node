import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../helpers/hooks/useAuth';
import "../../css/animaciones.css";

const LayoutPublic = () => {
  const { loading } = useAuth();

  if(loading){

    return (
      <div className="page-cargando">
        <span className="loader" />
      </div>
    );
  }
  
  return (
    <section className="content">

      <Outlet />
      
    </section>
  )
  
}

export default LayoutPublic