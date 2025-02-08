import React, { createContext, useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ArticulosContext = createContext();

export const ArticulosProvider = ({ children }) => {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        conseguirArticulos();
    }, []);

    const conseguirArticulos = async () => {
        
        const request = await fetch(BACKEND_URL + "listar", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
            }
        });
      
        const datos = await request.json();

        if (datos.status === "success") {
          setArticulos(datos.articulos);
        }
    };


    return (
        <ArticulosContext.Provider value={{ articulos, setArticulos }}>
            {children}
        </ArticulosContext.Provider>
    );
};
