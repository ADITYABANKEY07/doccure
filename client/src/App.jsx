import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./validationPage/Login";
import SignUp from "./validationPage/SignUp";
import Booking from "./pages/Booking";

const App = () => {
  // 1. Check if they are currently logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // 2. Check if any accounts exist in the "database"
  const hasAccount = localStorage.getItem("allUsers") !== null;

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='contact' element={<Contact />} />
            <Route path='booking' element={<Booking />} />
            <Route path='login' element={<Navigate to="/" />} />
            <Route path='signup' element={<Navigate to="/" />} />
          </Route>
        ) : (
          <>
            <Route 
              path='/' 
              element={hasAccount ? <Navigate to="/login" /> : <Navigate to="/signup" />} 
            />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to={hasAccount ? "/login" : "/signup"} />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;