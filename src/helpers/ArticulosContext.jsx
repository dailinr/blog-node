import React, { createContext, useState, useEffect } from 'react';
import { Global } from './Global';
import { PeticionAjax } from './PeticionAjax';

export const ArticulosContext = createContext();

export const ArticulosProvider = ({ children }) => {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        const fetchArticulos = async () => {

            const url = Global.url + "listar";
            const { datos } = await PeticionAjax(url, "GET");
            
            if (datos.status === "success") {
                setArticulos(datos.articulos);
            }
        };

        fetchArticulos();
    }, []);

    return (
        <ArticulosContext.Provider value={{ articulos, setArticulos }}>
            {children}
        </ArticulosContext.Provider>
    );
};
