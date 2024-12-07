import React, { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [modales, setModales] = useState({
    menuUsuario: false,
    notificaciones: false,
    menuArticulo: false
  });

  const refreshPage = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const cerrarModales = () => {
    setModales({
      menuUsuario: false,
      notificaciones: false,
      menuArticulo: false
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Detecta clics globales y cierra los modales si están abiertos
      if (modales.menuUsuario || modales.notificaciones || modales.menuArticulo) {
        cerrarModales();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modales]);

  return (
    <GlobalContext.Provider 
      value={{ refreshKey, refreshPage, modales, setModales, cerrarModales }}>

      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
