import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

const Layout = () => {
  return (
    /* 1. Added 'flex flex-col' and 'min-h-screen' to the wrapper */
    <div className="relative cursor-none flex flex-col min-h-screen"> 
        <Cursor /> 
        <Navbar/>
        
        {/* 2. Added 'flex-grow' to the main tag */}
        <main className="flex-grow">
          <Outlet/>
        </main>
        
        <Footer/>
    </div>
  )
}

export default Layout