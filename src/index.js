import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "contexts/AuthProvider";
import { PostProvider } from "contexts/PostProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </AuthProvider>
);
