import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import './toast.css'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import Login from "./pages/login/Login";
import Trending from "./pages/trending/Trending";
import SearchTheme from "./pages/search/Search";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/trending" /> : <Login setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn to Login component
            />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

            {/* Wrap the protected routes with the ProtectedRoute component */}
            <Route
              path="/trending"
              element={
                <ProtectedRoute isAuthenticated={isLoggedIn}>
                  <Trending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isAuthenticated={isLoggedIn}>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/series"
              element={
                <ProtectedRoute isAuthenticated={isLoggedIn}>
                  <Series />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute isAuthenticated={isLoggedIn}>
                  <SearchTheme />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </div>

      {isLoggedIn && <SimpleBottomNavigation />}
      <ToastContainer />
    </Router>
  );
}

export default App;
