import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header '>

        <div className='encabezado'>
            <div className='iconos-izq'>
                <i class='bx bx-revision'></i>
            </div>
            <div className='logo'>
                <div className='image-logo'></div>
            </div>

            <div className="iconos">
                <div className="icon-buscar">
                    <i class='bx bx-search-alt'></i>
                </div>
                <div className="icon-noti">
                    <i class='bx bxs-bell'></i>
                </div>
                <div className='icon-perfil'></div>
            </div>
            
        </div>

        

        <div className='navegacion'>
            <section className='active'>
                <p>inicio</p>
            </section>
            <section>
                <p>tendencias</p>
            </section>
            <section>
                <p>comunity</p>
            </section>
        </div>

        {/* <div className='buscador'>
            <input type="search" placeholder='buscar' />
        </div> */}
    </div>
  )
}

export default Header