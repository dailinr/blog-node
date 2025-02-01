import React, { useState } from 'react';
import '../../css/articulos.css'

const ModalConfirm = ({  confirmEliminar,  setModConfirm }) => {

  const handleConfirm = () => {
    if (confirmEliminar) {
      confirmEliminar();  // Verifica que esta función está definida antes de llamarla
    }
  };

  const handleCancel = () => {
    setModConfirm(false); // Cierra el modal sin eliminar
  };

  return (
    <>

    <div className="modal-overlay">
      <div className="modal-content">

        <div className="modal-header">
          <h5>Confirmar eliminación</h5>
        </div>

        <div className="modal-body">
          <p>¿Estás seguro de que deseas eliminar este artículo?</p>
        </div>

        <div className="modal-footer">
          <button onClick={handleConfirm} className="boton btn-danger ">
            Sí, eliminar
          </button>

          <button onClick={handleCancel} className="boton btn-secondary ">
            Cancelar
          </button>
        </div>

      </div>
    </div>
    </>
  )
}

export default ModalConfirm