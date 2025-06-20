import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Element } from "./screens/Element/Element";
import { Login } from "./screens/ElementLogin";
import { ForgotPassword } from "./screens/ForgotPassword";
import { VerifyCode } from "./screens/VerifyCode";
import { ResetPassword } from "./screens/ResetPassword";
import { PasswordResetSuccess } from "./screens/PasswordResetSuccess";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Element />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
