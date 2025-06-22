import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (value) => {
    if (!value) return 'Senha é obrigatória.';
    if (value.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
    if (value.length > 15) return 'A senha deve ter no máximo 15 caracteres.';
    if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) return 'A senha deve conter letras e números.';
    return '';
  };

  const validateConfirm = (value) => {
    if (!value) return 'Confirme a senha.';
    if (value !== password) return 'As senhas não correspondem.';
    return '';
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
    setConfirmError(validateConfirm(confirmPassword));
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmError(validateConfirm(e.target.value));
  };

  const handleBlur = (e) => {
    if (e.target.name === 'password') setPasswordError(validatePassword(password));
    if (e.target.name === 'confirmPassword') setConfirmError(validateConfirm(confirmPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passErr = validatePassword(password);
    const confErr = validateConfirm(confirmPassword);
    setPasswordError(passErr);
    setConfirmError(confErr);
    if (passErr || confErr) return;
    setError("");
    console.log("Nova senha:", password);
    navigate("/password-reset-success");
  };

  const inputStyle = "w-full h-10 px-4 py-2 text-base border border-[#DFEAF2] rounded-lg focus:outline-none focus:ring-0 focus:border-[#03A650]";

  return (
    <AuthLayout
      title="Redefinir Senha"
      subtitle="Crie uma nova senha para sua conta."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nova Senha
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handleBlur}
            required
            className={inputStyle + (passwordError ? ' border-red-500' : '')}
            placeholder="Digite sua nova senha"
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmar Nova Senha
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            onBlur={handleBlur}
            required
            className={inputStyle + (confirmError ? ' border-red-500' : '')}
            placeholder="Confirme sua nova senha"
          />
          {confirmError && <p className="text-red-500 text-xs mt-1">{confirmError}</p>}
        </div>
        
        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={!!passwordError || !!confirmError || !password || !confirmPassword}>
          Redefinir Senha
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword; 