import React, { createContext, useState, useEffect } from 'react';
import { Global } from './Global';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // Modificación: leer user del localStorage al cargar
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser();
    },[]);

    // metodo para autenticar al usuario
    const authUser = async() => {

        // Sacar datos del usuario identificado del localstorage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        // Comprobar si tengo el token y el user
        if(!token || !user){
            setLoading(false);
            setAuth(null); // Aseguramos que auth esté vacío
            return; // termina la funcion 
        }

        
        try{
            // Transformar los datos a un objeto de javaScript
            const userObj = JSON.parse(user);
            const userId = userObj.id;

            // Peticion ajax al backend que compruebe el token 
            const request = await fetch( Global.url + "usuario/perfil/" + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            
            if(request.ok) {
                // y me devuelva todos los datos del usuario
                const data = await request.json();
                setAuth(data.user);
            } else {
                console.warn("No se pudo obtener el perfil del usuario.");
            }

            // ------ Peticion para los contadores -----
            const requestCounters = await fetch( Global.url + "usuario/counters/" + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            if (requestCounters.ok) {
                const dataCounters  = await requestCounters.json();
                setCounters(dataCounters);
            } else {
                console.warn("No se pudo obtener los contadores del usuario.");
            }
        } 
        catch (error) {
            console.error("Error al obtener el perfil del usuario:", error);
            setAuth(null);
        } 
        finally {
            setLoading(false);
        }
    };


  return (
    <AuthContext.Provider 
        value={{auth, setAuth, loading, counters, authUser}} >

        { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;