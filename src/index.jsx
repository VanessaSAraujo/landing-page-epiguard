import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Element } from "./screens/Element/Element";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Element />
  </StrictMode>,
);
