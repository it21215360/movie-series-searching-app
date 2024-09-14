import React from "react";
import { Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const { logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Navigate to the login page first
    navigate("/login", { replace: true });

    // Perform the logout action
    logout({ returnTo: window.location.origin });
  };

  // Only show the logout button if the user is authenticated and not on the login page
  const showLogoutButton = isAuthenticated && location.pathname !== "/login";

  return (
    <div onClick={() => window.scroll(0, 0)} className="header">
      <Typography variant="h1">🎥 Entertainment++ 🎬</Typography>
      <div className="logoutbutton-container">
      {showLogoutButton && (
        <Button className="logout-button" variant="contained" color="primary" onClick={handleLogout}>
          Log Out
        </Button>
      )}
        </div>
    </div>
  );
}

export default Header;
