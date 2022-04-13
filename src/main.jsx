import React from "react";
import { createRoot } from "react-dom/client";
import Router from "@/Router";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// Print App version
console.log(`PalletPals v${GLOBAL.APP_VERSION}`);
