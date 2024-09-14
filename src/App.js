import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Trending from "./pages/trending/Trending";
import SearchTheme from "./pages/search/Search";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/MainNav";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<SearchTheme />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
