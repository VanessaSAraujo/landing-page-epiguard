import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Element } from "./screens/Element/Element";
import { Login } from "./screens/ElementLogin";
import { ForgotPassword } from "./screens/ForgotPassword";
import { VerifyCode } from "./screens/VerifyCode";
import { ResetPassword } from "./screens/ResetPassword";
import { PasswordResetSuccess } from "./screens/PasswordResetSuccess";
import AdminDashboard from "./screens/Dashboard/Admin/AdminDashboard";
import Cameras from "./screens/Dashboard/Admin/Cameras";
import CameraDetail from "./screens/Dashboard/Admin/CameraDetail";
import CameraForm from "./screens/Dashboard/Admin/CameraForm";
import Relatorios from "./screens/Dashboard/Admin/Relatorios";
import Users from "./screens/Dashboard/Admin/Users";
import UserForm from "./screens/Dashboard/Admin/UserForm";
import GeneralRegistrations from "./screens/Dashboard/Admin/GeneralRegistrations";
import ObraForm from "./screens/Dashboard/Admin/ObraForm";
import SetorForm from "./screens/Dashboard/Admin/SetorForm";
import Settings from "./screens/Dashboard/Admin/Settings";

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cameras" element={<Cameras />} />
        <Route path="/admin/cameras/new" element={<CameraForm />} />
        <Route path="/admin/cameras/:id" element={<CameraDetail />} />
        <Route path="/admin/cameras/:id/edit" element={<CameraForm />} />
        <Route path="/admin/reports" element={<Relatorios />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/new" element={<UserForm />} />
        <Route path="/admin/users/:id/edit" element={<UserForm />} />
        <Route path="/admin/general-registrations" element={<GeneralRegistrations />} />
        <Route path="/admin/general-registrations/obra/new" element={<ObraForm />} />
        <Route path="/admin/general-registrations/obra/:id/edit" element={<ObraForm />} />
        <Route path="/admin/general-registrations/setor/new" element={<SetorForm />} />
        <Route path="/admin/general-registrations/setor/:id/edit" element={<SetorForm />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
