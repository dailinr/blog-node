// ArticulosList.jsx
import React from 'react';
import { Listado } from './Listado';

const ArticulosList = ({ articulos, setArticulos }) => {
  return (
    <div className="ArticulosList">
      <Listado articulos={articulos} setArticulos={setArticulos} />
    </div>
  );
};

export default ArticulosList;
