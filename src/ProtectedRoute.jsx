import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, path, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");
  console.log("this", isAuthenticated);
  console.log("this", { isAuthenticated, role, path });

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        (isAuthenticated === "true" ? true : false) ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
}

export default ProtectedRoute;