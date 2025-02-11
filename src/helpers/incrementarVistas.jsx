const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const incrementarVistas = async(idArticulo, setArticulos) => {
    
    let url = BACKEND_URL + "ver/" + idArticulo;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if (data.status === "success") {

      // Actualizamos la lista de artículos para reflejar el nuevo número de vistas
      setArticulos((prevArticulos) =>
        prevArticulos.map((articulo) =>
          articulo._id === idArticulo ? { ...articulo, views: data.articulo.views } : articulo
        )
      );
    }
}