import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputStyle}
            placeholder="Digite sua nova senha"
          />
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
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={inputStyle}
            placeholder="Confirme sua nova senha"
          />
        </div>
        
        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Redefinir Senha
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword; 