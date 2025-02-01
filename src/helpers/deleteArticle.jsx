import { Global } from "./Global";

export const deleteArticle = async (id, setArticulos, setMostrarToast, setModConfirm) => {
  try {
    const response = await fetch(Global.url + "articulo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
    });

    const result = await response.json();

    if (result.status === "success") {
      // guardamos en una lista todos los articulos que no sean el del id eliminado
      setArticulos((prevArticles) => prevArticles.filter((articulo) => articulo._id !== id));
       
      // Mostrar feedback visual
      if (setMostrarToast) setMostrarToast(true);
      if (setModConfirm) setModConfirm(false);
    } else {
      console.error("Error al eliminar el artículo:", datos.message);
    }
  } catch (error) {
    console.error("Error de red al eliminar el artículo:", error);
  }
};
