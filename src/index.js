import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SkeletonTheme>
        <App />
      </SkeletonTheme>
    </BrowserRouter>
  </React.StrictMode>
);
