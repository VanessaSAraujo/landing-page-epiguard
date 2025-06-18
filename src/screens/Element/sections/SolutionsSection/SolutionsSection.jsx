import { CameraIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const SolutionsSection = () => {
  // Data for solution cards
  const solutionCards = [
    {
      id: 1,
      title: "Captura da imagem",
      description: "A câmera transmite em tempo real para o sistema.",
      icon: (
        <div className="bg-[#03a650] rounded-lg w-[59px] h-[59px] flex items-center justify-center">
          <CameraIcon className="w-[55px] h-[55px] text-white" />
        </div>
      ),
    },
    {
      id: 2,
      title: "Análise com utilzação de IA",
      description: "O algoritmo detecta a ausência do capacete.",
      icon: (
        <img
          className="w-[59px] h-[59px]"
          alt="IA Analysis Icon"
          src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/group-30.png"
        />
      ),
    },
    {
      id: 3,
      title: "Registro da Ocorrência",
      description: "Data, hora, local e imagem são salvos no banco.",
      icon: (
        <img
          className="w-[59px] h-[59px]"
          alt="Registration Icon"
          src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/group-30-1.png"
        />
      ),
    },
    {
      id: 4,
      title: "Acesso pela empresa",
      description: "O gestor visualiza os dados no painel da empresa.",
      icon: (
        <img
          className="w-[59px] h-[59px]"
          alt="Access Icon"
          src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/group-30-2.png"
        />
      ),
    },
  ];

  return (
    <section id="solucao" className="w-full py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className=" text-3xl md:text-5xl lg:text-6xl font-bold text-black text-center leading-[80px] font-['Poppins',Helvetica] mb-16">
          Segurança Automatizada Com Inteligência Artificial
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2">
            <p className="text-lg md:text-lg lg:text-xl font-normal text-black leading-10 font-['Poppins',Helvetica]">
              A EPIGuard é uma plataforma inteligente que detecta em tempo real
              a ausência de EPIs, começando pelo capacete, por meio de câmeras e
              IA.
              <br />
              <br />
              As ocorrências são registradas com dados precisos e ficam
              disponíveis para visualização via dashboard, acessível por
              desktop, tablet ou celular.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              className="w-[577px] h-[381px]"
              alt="Galaxy tab ultra"
              src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/galaxy-tab-s8-ultra.svg"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-linear-2 mt-20">
        <div className="container mx-auto px-4 max-w-7xl py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutionCards.map((card) => (
              <Card key={card.id} className="bg-white rounded-lg">
                <CardContent className="flex flex-col items-center pt-10 pb-8 px-3">
                  <div className="mb-4 flex justify-center">{card.icon}</div>
                  <h3 className="font-['Poppins',Helvetica] font-bold text-[#222222] text-3xl text-center tracking-[0.20px] leading-7 mb-6">
                    {card.title}
                  </h3>
                  <p className="font-['Poppins',Helvetica] font-normal text-[#03a650] text-xl text-center tracking-[0.30px] leading-6">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
