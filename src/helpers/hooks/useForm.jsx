import React from 'react'
import { useState } from 'react'

export const useForm  = ( objetoInicial = {} ) => {
  
    const [formulario, setFormulario] = useState(objetoInicial);

    const serializadoFormulario = (formulario) => {

        const formData = new FormData(formulario);
        const objetoCompleto = {};

        for(let [name, value] of formData){
            objetoCompleto[name] = value;
        }
        return objetoCompleto;
    }

    const enviado = (e) => {
        e.preventDefault();

        let curso = serializadoFormulario(e.target);

        setFormulario(curso);

        document.querySelector(".codigo").classList.add("enviado");
    }

    const cambiado = ({target}) => {
        const {name, value} = target;

        setFormulario ({
            ...formulario,
            [name]: value
        });

        // console.log(formulario);
    }

    return {
        formulario,
        enviado,
        cambiado,
        setFormulario
    }
}
