import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const {currentUser} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect basename={process.env.PUBLIC_URL} to="/" />
        )
      }
    />
  );
}
