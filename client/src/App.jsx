import React, { useState, useEffect } from 'react'; // Added Hooks
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./validationPage/Login";
import SignUp from "./validationPage/SignUp";
import Booking from "./pages/Booking";
import Status from './pages/Status';

const App = () => {
  // Use state so React watches these values
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [hasAccount, setHasAccount] = useState(localStorage.getItem("allUsers") !== null);

  // This ensures that when the page reloads (after signup), the data is fresh
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setHasAccount(localStorage.getItem("allUsers") !== null);
  }, []);

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          /* --- STATE 1: LOGGED IN --- */
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='contact' element={<Contact />} />
            <Route path='booking' element={<Booking />} />
            <Route path='status' element={<Status />} />
            <Route path='login' element={<Navigate to="/" />} />
            <Route path='signup' element={<Navigate to="/" />} />
          </Route>
        ) : (
          /* --- STATE 2 & 3: NOT LOGGED IN --- */
          <>
            {/* Logic: Protect login route manually */}
            <Route 
              path='/login' 
              element={hasAccount ? <Login /> : <Navigate to="/signup" />} 
            />
            
            <Route path='/signup' element={<SignUp />} />

            {/* If no path matches, decide where to send them based on data */}
            <Route 
              path='/' 
              element={hasAccount ? <Navigate to="/login" /> : <Navigate to="/signup" />} 
            />

            <Route 
              path='*' 
              element={<Navigate to={hasAccount ? "/login" : "/signup"} />} 
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;