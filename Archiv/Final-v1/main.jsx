import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";
import { ContextProvider } from "./AppContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Toaster position="top-left" />
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </StrictMode>,
);
