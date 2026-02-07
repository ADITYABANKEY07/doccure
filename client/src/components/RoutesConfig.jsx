import { Navigate, Outlet } from "react-router-dom";

// Only logged-in users can see these (Booking, Status)
export const ProtectedRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

// Only logged-out users can see these (Login, SignUp)
export const PublicRoute = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};