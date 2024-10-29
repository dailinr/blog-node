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
        const url = Global.url + "listar";
    
        const {datos } = await PeticionAjax(url, "GET");
    
        if (datos.status === "success") {
          setArticulos(datos.articulos.docs);
        }
    };


    return (
        <ArticulosContext.Provider value={{ articulos, setArticulos }}>
            {children}
        </ArticulosContext.Provider>
    );
};
