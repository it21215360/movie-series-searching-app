import React from "react";
import { createRoot } from "react-dom/client"; // New import for React 18
import "./index.css";
import App from "./App";

// Find the root element in the DOM
const container = document.getElementById("root");

// Create the root and render the App
const root = createRoot(container);

root.render(
  <>
    <App />
  </>
);
