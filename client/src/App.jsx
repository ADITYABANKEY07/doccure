import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from "../src/pages/Home"
import Contact from "../src/pages/Contact"
import Login from "../src/pages/Login"
import SignUp from "../src/pages/SignUp"
import Booking from "../src/pages/Booking"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/booking' element={<Booking/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App