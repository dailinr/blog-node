import { Global } from "./Global";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPerfil = async(userId, setState) => {
        
    const request = await fetch(BACKEND_URL + "usuario/perfil/"+ userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    const data = await request.json();

    if(data.status == "success"){
        setState(data.user)
    }

    return data;
}