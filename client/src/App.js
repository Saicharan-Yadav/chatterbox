import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import LandingPage from "./components/LandingPage/LandingPage";
import SignUpPage from "./components/LandingPage/SignUpPage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(false);

  useEffect(() => {
    login();
  }, []);

  const logout = () => {
    setUser(false);
    Cookies.remove("token");
  };

  const login = () => {
    if (Cookies.get("token")) {
      setUser(true);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainPage page="home" logout={logout} />
            ) : (
              <LandingPage login={login} />
            )
          }
        />
        <Route
          path="/search"
          element={
            user ? (
              <MainPage page="search" logout={logout} />
            ) : (
              <LandingPage login={login} />
            )
          }
        />
        <Route
          path="/new-post"
          element={
            user ? (
              <MainPage page="newpost" logout={logout} />
            ) : (
              <LandingPage login={login} />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={
            user ? (
              <MainPage page="profile" logout={logout} />
            ) : (
              <LandingPage login={login} />
            )
          }
        />
        <Route
          path="/friend-requests"
          element={
            user ? (
              <MainPage page="friend-requests" logout={logout} />
            ) : (
              <LandingPage login={login} />
            )
          }
        />
        <Route path="/sign-up" element={<SignUpPage login={login} />} />
      </Routes>
    </Router>
  );
}

export default App;
