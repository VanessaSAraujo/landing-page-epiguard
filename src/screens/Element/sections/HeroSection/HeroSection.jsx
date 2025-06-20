import React from "react";
import { Button } from "../../../../components/ui/button";
import { NavigationSection } from "../NavigationSection/NavigationSection";

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative w-full min-h-screen overflow-hidden">
      {/* Imagem de fundo */}
      <img
        src="https://c.animaapp.com/mbwwxgpsubFCCM/img/background-top_1.svg"
        alt="Fundo capacetes"
        className="absolute top-0 left-0 w-screen h-full object-cover z-0"
      />

      {/* Menu */}
      <div className="absolute top-0 left-0 w-full z-20">
        <NavigationSection />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-[20vh] pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 w-full">
          {/* Texto */}
          <div className="max-w-[693px] text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-['Poppins',Helvetica] font-bold text-[#222222] text-3xl md:text-5xl lg:text-6xl leading-tight lg:leading-[80px] tracking-tight">
                Monitore EPIs Em Tempo Real Com Tecnologia De Ponta
              </h1>
              <p className="font-['Poppins',Helvetica] text-[#222222] text-base md:text-lg lg:text-xl leading-relaxed max-w-[637px] mx-auto lg:mx-0">
                EPIGuard identifica automaticamente a ausência de capacetes no ambiente de trabalho e gera alertas com dados e imagens em tempo real.
              </p>
            </div>

            <div className="mt-4 md:mt-8">
              <Button className="h-[45px] w-full sm:w-[300px] bg-[#03a650] rounded-[5px] hover:bg-[#038a42] transition-colors text-lg">
                <span className="font-bold text-white">
                  Solicitar Demonstração
                </span>
              </Button>
            </div>
          </div>

          {/* Logo - só aparece no desktop */}
          <div className="flex-shrink-0 hidden lg:block">
            <img
              className="w-[400px] h-auto"
              alt="EPIGuard Logo"
              src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/7-2.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
