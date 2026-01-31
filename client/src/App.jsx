import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./validationPage/Login";
import SignUp from "./validationPage/SignUp";
import Booking from "./pages/Booking";
import Status from './pages/Status';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [hasAccount, setHasAccount] = useState(localStorage.getItem("allUsers") !== null);

  useEffect(() => {
    
    const syncState = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setHasAccount(localStorage.getItem("allUsers") !== null);
    };
    window.addEventListener('storage', syncState);
    return () => window.removeEventListener('storage', syncState);
  }, []);

  return (
    <Routes>
      
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='contact' element={<Contact />} />

        
        <Route 
          path='booking' 
          element={isLoggedIn ? <Booking /> : <Navigate to="/login" />} 
        />
        <Route 
          path='status' 
          element={isLoggedIn ? <Status /> : <Navigate to="/login" />} 
        />
      </Route>

      <Route 
        path='/login' 
        element={isLoggedIn ? <Navigate to="/" /> : (hasAccount ? <Login /> : <Navigate to="/signup" />)} 
      />
      <Route 
        path='/signup' 
        element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} 
      />

      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;