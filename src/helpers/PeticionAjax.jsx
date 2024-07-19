export const PeticionAjax = async (url, metodo, datosGuardar = "") => {
    
    let cargando = true;

    let opciones = {
        // por defecto
        method: "GET",
    };

    if (metodo == "GET" || metodo == "DELETE") {
        opciones = {
            method: metodo,
        };
    }
    if (metodo == "POST" || metodo == "PUT") {
        opciones = {
            method: metodo,
            body: JSON.stringify(datosGuardar),
            headers: {
                "Content-Type": "application/json", // formato para datos que recibe mi api
            },
        };
    }
    const peticion = await fetch(url, opciones);
    const datos = await peticion.json();

    // console.log(datos);

    cargando = false;

    return {
        datos,
        cargando,
    };
};
