import React, { createContext, useEffect, useState } from "react";
import firebaseApp from "./firebaseApp";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   //firebaseApp.auth().onAuthStateChanged((user) => {
  //   // axios
  //   //   .post("http://localhost:5000/user/login", user)
  //   //   .then((res) => {
  //   //     setCurrentUser(res.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     setCurrentUser(null);
  //   //   });
  //   //});
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
