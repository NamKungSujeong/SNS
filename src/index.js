import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { AuthProvider } from "contexts/AuthProvider";
import { SweetProvider } from "contexts/SweetProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SweetProvider>
      <App />
    </SweetProvider>
  </AuthProvider>
);
