import React, {useEffect} from 'react';
import "../../css/cerrarSesion.css";
import { useNavigate } from "react-router-dom";
import useAuth from '../../helpers/hooks/useAuth';

export const CerrarSesion = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Vaciar el localstorage
    localStorage.clear();

    // Setear estados globales a vacio
    setAuth(null);

    // Navigate (redireccion) al login
    navigate('/usuario/login');
  }, [setAuth, navigate]);

  return (
    <div className="page-cargando">
        <h1 className='cerrar-texto'>Cerrando Sesion</h1>
        <span className="loader-out" />
    </div>
  )
}
