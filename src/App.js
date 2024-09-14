import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Login from "./pages/login/Login";
import Trending from "./pages/trending/Trending";
import SearchTheme from "./pages/search/Search";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/MainNav";

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
            <Route path="/trending" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<SearchTheme />} />
          </Routes>
        </Container>
      </div>
      {isLoggedIn && <SimpleBottomNavigation />} {/* Show the navigation only if logged in */}
    </Router>
  );
}

export default App;
