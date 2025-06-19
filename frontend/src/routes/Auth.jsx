import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;
