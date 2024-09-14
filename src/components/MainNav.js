import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate } from "react-router-dom";
import { Movie, Tv, Search, Whatshot } from "@mui/icons-material";

// Styled component for BottomNavigation
const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: "100%",
  position: "fixed",
  bottom: 0,
  backgroundColor: "#2d313a",
  zIndex: 100,
}));

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    if (value === 1) navigate("/movies");
    if (value === 2) navigate("/series");
    if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <StyledBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Trending"
        sx={{ color: "white" }} // Updated to use the sx prop
        icon={<Whatshot />}
      />
      <BottomNavigationAction
        label="Movies"
        sx={{ color: "white" }} // Updated to use the sx prop
        icon={<Movie />}
      />
      <BottomNavigationAction
        label="TV Series"
        sx={{ color: "white" }} // Updated to use the sx prop
        icon={<Tv />}
      />
      <BottomNavigationAction
        label="Search"
        sx={{ color: "white" }} // Updated to use the sx prop
        icon={<Search />}
      />
    </StyledBottomNavigation>
  );
}
