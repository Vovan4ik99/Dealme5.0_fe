import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import App from "./components/layout/App/App.tsx";


const rootContainer = document.getElementById("root")!;

createRoot(rootContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);
