// import React from "react";
// import { Button } from "../../../../components/ui/button";
// import { NavigationSection } from "../NavigationSection/NavigationSection";

// export const HeroSection = () => {
//   return (
//     <section id="inicio" className="relative w-full min-h-screen overflow-hidden">
//       {/* Imagem de fundo com controle total */}
//       <img
//         src="https://c.animaapp.com/mbwwxgpsubFCCM/img/background-top_1.svg"
//         alt="Fundo capacetes"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />

//       <div className="absolute top-0 left-0 w-full z-20"> 
//         {/* Navegação */}
//         <NavigationSection />
//       </div>

//       {/* Conteúdo sobreposto */}
//       <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-[200px] w-full">
//           {/* Texto */}
//           <div className="max-w-[693px]">
//             <div className="space-y-8">
//               <h1 className="font-['Poppins',Helvetica] font-bold text-[#222222] text-5xl md:text-6xl tracking-[-3.00px] leading-[80px]">
//                 Monitore Epis Em Tempo Real Com Tecnologia De Ponta
//               </h1>
//               <p className="font-['Poppins',Helvetica] font-normal text-[#222222] text-xl md:text-[25px] tracking-normal leading-[42px] max-w-[637px]">
//                 EPIGuard identifica automaticamente a ausência de capacetes no
//                 ambiente de trabalho e gera alertas com dados e imagens em
//                 tempo real.
//               </p>
//             </div>

//             <div className="mt-12">
//               <Button className="h-[50px] w-[388px] bg-[#03a650] rounded-[5px] hover:bg-[#038a42] transition-colors">
//                 <span className="font-['Poppins',Helvetica] font-bold text-white text-[25px] tracking-normal leading-10">
//                   Solicitar Demonstração
//                 </span>
//               </Button>
//             </div>
//           </div>

//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <img
//               className="w-[561px] h-[291px]"
//               alt="EPIGuard Logo"
//               src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/7-2.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// 
// import React from "react";
// import { Button } from "../../../../components/ui/button";
// import { NavigationSection } from "../NavigationSection/NavigationSection";

// export const HeroSection = () => {
//   return (
//     <section className="relative w-full min-h-screen overflow-hidden">
//       {/* Imagem de fundo */}
//       <img
//         src="https://c.animaapp.com/mbwwxgpsubFCCM/img/background-top_1.svg"
//         alt="Fundo capacetes"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />

//       {/* Menu */}
//       <div className="absolute top-0 left-0 w-full z-20">
//         <NavigationSection />
//       </div>

//       {/* Conteúdo */}
//       <div className="relative z-10 container mx-auto px-4 md:px-8 h-full flex items-center pt-[180px] pb-12">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
//           {/* Texto */}
//           <div className="max-w-[693px] text-center lg:text-left">
//             <div className="space-y-6">
//               <h1 className="font-['Poppins',Helvetica] font-bold text-[#222222] text-3xl md:text-5xl lg:text-6xl leading-tight lg:leading-[80px] tracking-tight">
//                 Monitore EPIs Em Tempo Real Com Tecnologia De Ponta
//               </h1>
//               <p className="font-['Poppins',Helvetica] text-[#222222] text-base md:text-lg lg:text-xl leading-relaxed max-w-[637px] mx-auto lg:mx-0">
//                 EPIGuard identifica automaticamente a ausência de capacetes no ambiente de trabalho e gera alertas com dados e imagens em tempo real.
//               </p>
//             </div>

//             <div className="mt-8 md:mt-10">
//               <Button className="h-[45px] w-full sm:w-[300px] bg-[#03a650] rounded-[5px] hover:bg-[#038a42] transition-colors text-lg">
//                 <span className="font-bold text-white">
//                   Solicitar Demonstração
//                 </span>
//               </Button>
//             </div>
//           </div>

//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <img
//               className="w-[300px] md:w-[420px] lg:w-[561px] h-auto"
//               alt="EPIGuard Logo"
//               src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/7-2.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// primeira tentativa
// import React from "react";
// import { Button } from "../../../../components/ui/button";
// import { NavigationSection } from "../NavigationSection/NavigationSection";

// export const HeroSection = () => {
//   return (
//     <section className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden">
//       {/* Imagem de fundo */}
//       <img
//         src="https://c.animaapp.com/mbwwxgpsubFCCM/img/background-top_1.svg"
//         alt="Fundo capacetes"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />

//       {/* Menu fixo */}
//       <div className="absolute top-0 left-0 w-full z-20">
//         <NavigationSection />
//       </div>

//       {/* Conteúdo principal */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center pt-[160px] pb-12">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
          
//           {/* Bloco de texto */}
//           <div className="max-w-[693px] text-center lg:text-left">
//             <div className="space-y-6">
//               <h1 className="font-['Poppins',Helvetica] font-bold text-[#222222] text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight lg:leading-[80px] tracking-tight">
//                 Monitore EPIs Em Tempo Real Com Tecnologia De Ponta
//               </h1>
//               <p className="font-['Poppins',Helvetica] text-[#222222] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-[637px] mx-auto lg:mx-0">
//                 EPIGuard identifica automaticamente a ausência de capacetes no ambiente de trabalho e gera alertas com dados e imagens em tempo real.
//               </p>
//             </div>

//             {/* Botão */}
//             <div className="mt-8 md:mt-10">
//               <Button className="h-[45px] w-full sm:w-[300px] bg-[#03a650] rounded-[5px] hover:bg-[#038a42] transition-colors text-lg">
//                 <span className="font-bold text-white">
//                   Solicitar Demonstração
//                 </span>
//               </Button>
//             </div>
//           </div>

//           {/* Logo lateral — aparece só em telas maiores */}
//           <div className="hidden lg:block flex-shrink-0">
//             <img
//               className="w-[300px] md:w-[420px] lg:w-[561px] h-auto"
//               alt="EPIGuard Logo"
//               src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/7-2.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


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
