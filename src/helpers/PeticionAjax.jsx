export const PeticionAjax = async (url, metodo, datosGuardar = "", archivos = false) => {
    
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
        
        // los datos del formulario se convertiran en cadenas JSON por defecto
        let body = JSON.stringify(datosGuardar);

        if(archivos){ // si se ha subido algun archivo
            opciones = {
                method: metodo,
                body: datosGuardar,
            };
        }else{
             
            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar),
                headers: {
                    "Content-Type": "application/json", // formato para datos que recibe mi api
                },
            };
        }

        
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
