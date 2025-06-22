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
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./screens/Dashboard/User/UserDashboard";
import UserCameras from "./screens/Dashboard/User/UserCameras";
import UserCameraDetail from "./screens/Dashboard/User/UserCameraDetail";

// Exemplo de dashboard do técnico (você pode criar depois)
// const UserDashboard = () => <div>Dashboard do Técnico</div>;

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Element />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-reset-success" element={<PasswordResetSuccess />} />

          {/* Rotas protegidas para admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/cameras" element={<PrivateRoute role="admin"><Cameras /></PrivateRoute>} />
          <Route path="/admin/cameras/new" element={<PrivateRoute role="admin"><CameraForm /></PrivateRoute>} />
          <Route path="/admin/cameras/:id" element={<PrivateRoute role="admin"><CameraDetail /></PrivateRoute>} />
          <Route path="/admin/cameras/:id/edit" element={<PrivateRoute role="admin"><CameraForm /></PrivateRoute>} />
          <Route path="/admin/reports" element={<PrivateRoute role="admin"><Relatorios /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute role="admin"><Users /></PrivateRoute>} />
          <Route path="/admin/users/new" element={<PrivateRoute role="admin"><UserForm /></PrivateRoute>} />
          <Route path="/admin/users/:id/edit" element={<PrivateRoute role="admin"><UserForm /></PrivateRoute>} />
          <Route path="/admin/general-registrations" element={<PrivateRoute role="admin"><GeneralRegistrations /></PrivateRoute>} />
          <Route path="/admin/general-registrations/obra/new" element={<PrivateRoute role="admin"><ObraForm /></PrivateRoute>} />
          <Route path="/admin/general-registrations/obra/:id/edit" element={<PrivateRoute role="admin"><ObraForm /></PrivateRoute>} />
          <Route path="/admin/general-registrations/setor/new" element={<PrivateRoute role="admin"><SetorForm /></PrivateRoute>} />
          <Route path="/admin/general-registrations/setor/:id/edit" element={<PrivateRoute role="admin"><SetorForm /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute role="admin"><Settings /></PrivateRoute>} />

          {/* Rotas protegidas para técnico */}
          <Route path="/user/dashboard" element={<PrivateRoute role="tecnico"><UserDashboard /></PrivateRoute>} />
          <Route path="/user/cameras" element={<PrivateRoute role="tecnico"><UserCameras /></PrivateRoute>} />
          <Route path="/user/cameras/:id" element={<PrivateRoute role="tecnico"><UserCameraDetail /></PrivateRoute>} />
          {/* Adicione aqui outras rotas de técnico, como relatorios, settings, etc */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
