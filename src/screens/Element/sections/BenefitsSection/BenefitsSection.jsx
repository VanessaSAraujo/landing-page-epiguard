import React from "react";

export const BenefitsSection = () => {
  // Benefits data for mapping
  const benefits = [
    {
      id: 1,
      text: "Redução de acidentes e multas",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/group.png",
    },
    {
      id: 2,
      text: "Conformidade com normas de segurança",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/group-1.png",
    },
    {
      id: 3,
      text: "Registro seguro em nuvem",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/group-2.png",
    },
    {
      id: 4,
      text: "Relatórios para auditorias e tomadas de decisão",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/group-3.png",
    },
  ];

  return (
    <section id="beneficios" className="w-full max-w-[1242px] mx-auto py-16">
      <h2 className="text-[55px] font-bold font-['Poppins',Helvetica] text-center mb-16 leading-[80px]">
        Quais Os Benefícios De Usar A Epiguard?
      </h2>

      <div className="max-w-[974px]">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-center mb-10 last:mb-0">
            <div className="w-[65px] h-[65px] flex-shrink-0">
              <img
                className="w-[59px] h-[59px] m-[3px]"
                alt="Benefit icon"
                src={benefit.icon}
              />
            </div>
            <p className="ml-[41px] font-['Poppins',Helvetica] font-normal text-2xl leading-10">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
