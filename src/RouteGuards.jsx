import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const AuthGuard = ({ children }) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const NoAuthGuard = ({ children }) => {
  const { authenticated } = useAuth();
  if (authenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
