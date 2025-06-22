import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o e-mail de recuperação
    console.log("Solicitação de recuperação para o e-mail:", email);
    navigate("/verify-code");
  };
  
  const inputStyle = "w-full h-10 px-4 py-2 text-base border border-[#DFEAF2] rounded-lg focus:outline-none focus:ring-0 focus:border-[#03A650]";

  return (
    <AuthLayout
      title="Esqueceu sua Senha?"
      subtitle="Não se preocupe! Insira seu e-mail para receber um código de verificação."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyle}
            placeholder="Digite seu e-mail"
          />
        </div>

        <Button type="submit" className="w-full">
          Enviar Código
        </Button>
        
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Voltar para o Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword; 