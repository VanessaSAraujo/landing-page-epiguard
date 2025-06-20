import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button } from "../../components/ui/button";
import OtpInput from "../../components/ui/OtpInput";
import Notification from "../../components/ui/Notification";

const VerifyCode = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      showNotification("Um novo código foi enviado!", "success");
    }
  };

  const handleVerify = () => {
    const correctCode = "1234"; // Apenas para teste
    if (otp !== correctCode || otp.length < 4) {
      showNotification("Código incorreto", "error");
    } else {
      navigate("/reset-password");
    }
  };

  return (
    <AuthLayout>
      <Notification show={notification.show} message={notification.message} type={notification.type} />
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#03a650] font-['Poppins',Helvetica]">
            Verificação
          </h2>
          <p className="text-gray-600 mt-2 max-w-sm mx-auto">
            Digite o código de 4 dígitos que você recebeu em seu e-mail.
          </p>
        </div>

        <OtpInput length={4} onComplete={setOtp} />

        <div className="text-lg font-medium text-gray-700">
          00:{timer.toString().padStart(2, '0')}
        </div>

        <Button
          onClick={handleVerify}
          className="w-full h-[47px] bg-[#04bf45] hover:bg-[#03a650] rounded-lg text-xl font-['Poppins',Helvetica]"
        >
          Verificar
        </Button>
        
        <button
          onClick={handleResend}
          disabled={!canResend}
          className="text-sm font-semibold text-[#222222] opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reenviar o código
        </button>

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

export default VerifyCode; 