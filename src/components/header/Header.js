import React from "react";
import "./Header.css";
import { Typography } from "@mui/material";

function Header() {
  return (
    <div onClick={() => window.scroll(0, 0)} className="header">
      <Typography variant="h1">🎥 Entertainment++ 🎬</Typography>
    </div>
  );
}

export default Header;
