import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    console.log("token " + token)
    const response = await fetch("http://localhost:8080/api/v1/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
        return <Navigate to="/login" replace />;
    }
  };

  // In ProtectedRoute or any other component, call validateToken()
  validateToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
