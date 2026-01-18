import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Cursor from './components/Cursor' // 1. Import it

const Layout = () => {
  return (
    <div className="relative cursor-none"> {/* 2. Optional: hide default cursor */}
        <Cursor /> 
        <Navbar/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout