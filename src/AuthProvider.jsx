// AuthProvider.js
import { CircularProgress } from "@mui/material";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check user authentication status
    const userDataString = localStorage.getItem("userData");
    console.log(userDataString);
    if (userDataString) {
      setAuthenticated(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = () => {
    // Your authentication logic goes here
    setAuthenticated(true);
  };

  const logout = () => {
    // Your logout logic goes here
    setAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust this value based on your design requirements
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout, search, setSearch, cart, setCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
