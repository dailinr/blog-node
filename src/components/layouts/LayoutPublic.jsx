import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <>
        {/* <Header /> */}

        <section id="content" className="content">
            <Outlet />
        </section>

        {/* <Footer /> */}
    </>
  )
}

export default LayoutPublic