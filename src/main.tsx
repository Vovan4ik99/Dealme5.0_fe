import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/layout/App/App.tsx";
import "./styles/global.scss";

const rootContainer = document.getElementById("root")!;

createRoot(rootContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);
