import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthGuard, NoAuthGuard } from "./RouteGuards";
import { HomePage } from "./pages/home";
import { Login } from "./pages/Login";
import { AuthProvider } from "./AuthProvider";
import Cart from "./pages/Cart";
import Layout from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              }
            />
            <Route
              path="cart"
              element={
                <AuthGuard>
                  <Cart />
                </AuthGuard>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <NoAuthGuard>
                <Login />
              </NoAuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
