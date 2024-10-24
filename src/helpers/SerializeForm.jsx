export const SerializeForm = (form) => {
    const formData = new FormData(form); // Crear FormData a partir del formulario
    const completeObj = {};
  
    for (let [name, value] of formData.entries()) {
      completeObj[name] = value; // Guardar los datos del formulario en un objeto
    }
  
    // Devuelve el objeto completo 
    return completeObj;
}