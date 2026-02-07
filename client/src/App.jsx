import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./validationPage/Login";
import SignUp from "./validationPage/SignUp";
import Booking from "./pages/Booking";
import Status from "./pages/Status";
import { ProtectedRoute, PublicRoute } from "./components/RoutesConfig";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="contact" element={<Contact />} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="booking" element={<Booking />} />
          <Route path="status" element={<Status />} />
        </Route>
      </Route>

      <Route element={<PublicRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
