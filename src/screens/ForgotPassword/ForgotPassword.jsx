import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button } from "../../components/ui/button";
import FloatingLabelInput from "../../components/ui/FloatingLabelInput";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Aqui você adicionaria a lógica para enviar o email
    // e então navegar para a próxima página.
    navigate("/verify-code");
  };

  return (
    <AuthLayout>
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#03a650] font-['Poppins',Helvetica]">
            Esqueci Minha Senha
          </h2>
          <p className="text-gray-600 mt-2 max-w-sm mx-auto">
            Digite seu e-mail para o processo de verificação, enviaremos um código de 4 dígitos para seu e-mail.
          </p>
        </div>

        <FloatingLabelInput
          type="email"
          label="E-mail"
        />

        <Button
          onClick={handleContinue}
          className="w-full h-[47px] bg-[#04bf45] hover:bg-[#03a650] rounded-lg text-xl font-['Poppins',Helvetica]"
        >
          Continuar
        </Button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-[#222222] opacity-70"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para o Início
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword; 