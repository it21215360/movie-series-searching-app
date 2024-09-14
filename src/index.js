import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from "react-dom/client"; // New import for React 18
import "./index.css";
import App from "./App";

// Find the root element in the DOM
const container = document.getElementById("root");

// Create the root and render the App
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain="dev-vjfpe61c7wof5y46.us.auth0.com"
    clientId="3iAGTNGhAUOwT9M44Mp2jOz9PGZjHVl1"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
    </Auth0Provider>
);
