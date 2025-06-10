import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  const role = getUserRole();
  if (!allowedRoles.includes(role)) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
