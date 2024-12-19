import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/layout/App/App.tsx";
import "./styles/global.scss";

const rootContainer = document.getElementById("root")!;
export const modalsContiner = document.getElementById("modals")!;

createRoot(rootContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);
