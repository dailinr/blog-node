   // Función para formatear la fecha en "hace X tiempo" con ajuste de zona horaria
   export const formatearTiempoRelativo = (fecha) => {
    const ahora = new Date();
    const fechaArticulo = new Date(fecha);
  
    // Ajustar fecha a la zona horaria local
    const diferencia = ahora.getTime() - fechaArticulo.getTime(); // Diferencia en milisegundos
  
    // Convertir la diferencia a segundos, minutos, horas, días, meses y años
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const años = Math.floor(meses / 12);
  
    if (segundos < 60) {
      return `hace ${segundos} ${segundos === 1 ? 'segundo' : 'segundos'}`;
    } else if (minutos < 60) {
      return `hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    } else if (horas < 24) {
      return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    } else if (dias < 30) {
      return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    } else if (meses < 12) {
      return `hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    } else {
      return `hace ${años} ${años === 1 ? 'año' : 'años'}`;
    }
  };
