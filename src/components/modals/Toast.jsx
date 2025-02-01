import React from 'react';
import "../../css/tostada.css";
import SvgToast from './SvgToast';

const Toast = ({ mensaje, background, type }) => {

  return (

    <div className="tostada" style={{backgroundColor: background || '#0037b6'}}>

        <div className="toast-cont">
            <div className="svg-toast">
                <SvgToast type={type} />
            </div>
            <div>
                <div className="titulo-toast">{mensaje}</div>
            </div>
        </div>
        
    </div>
  )
}

export default Toast