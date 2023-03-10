import React from "react";
import "./scss/index.scss";
import { createRoot } from "react-dom/client";
import App from "./App";

const dsclub = document.getElementById("dsclub");

const root = createRoot(dsclub);

root.render(<App />);
