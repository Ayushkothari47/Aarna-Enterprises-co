import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // get JWT from localStorage

  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // optionally: you can also verify token format here (decode with jwt-decode)
  return children;
};

export default ProtectedRoute;
