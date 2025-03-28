import React from "react";
import  { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Theme";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <AuthProvider>
    <BrowserRouter> {/* ✅ BrowserRouter must be OUTSIDE AuthProvider */}
      <ThemeProvider theme={darkTheme}>

        <App />
      </ThemeProvider>
    </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);
