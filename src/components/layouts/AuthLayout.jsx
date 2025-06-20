import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      {/* Lado esquerdo - Imagem de fundo */}
      <div className="w-1/2 bg-[#004225] hidden md:block">
        <img
          className="w-full h-full object-cover"
          alt="EPIGuard background"
          src="/src/assets/Left_epiGuard.svg" 
        />
      </div>

      {/* Lado direito - Conteúdo dinâmico (Formulário) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 