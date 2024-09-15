import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css"; 
import loginImage from '../../images/12.jpg';

function Login({ setIsLoggedIn }) {
  const { user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation(); 

  const message = location.state?.message || ""; 

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true);
      navigate("/trending");
    }
  }, [isAuthenticated, navigate, setIsLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      {message && <div className="login-message">{message}</div>} 
      <div className="image-container">
        <img src={loginImage} alt="Description" className="login-image" />
      </div>
      <div className="button-container">
        {isAuthenticated ? (
          <div>
            <h2>Welcome, {user.name}</h2>
          </div>
        ) : (
          <button className="login-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
