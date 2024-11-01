import React, { createContext, useState, useEffect } from 'react';
import { Global } from './Global';
import { PeticionAjax } from './PeticionAjax';

export const ArticulosContext = createContext();

export const ArticulosProvider = ({ children }) => {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        conseguirArticulos();
    }, []);

    const conseguirArticulos = async () => {
        
        const request = await fetch(Global.url + "listar", {
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
