// import React, { useState } from "react";
// import { Button } from "../../../../components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "../../../../components/ui/navigation-menu";

// export const NavigationSection = () => {
//   const [activeItem, setActiveItem] = useState("Início");
  
//   // Navigation menu items data
//   const menuItems = [
//     { name: "Início", href: "#" },
//     { name: "Solução", href: "#" },
//     { name: "Benefícios", href: "#" },
//     { name: "Contato", href: "#" },
//   ];
  
//   const handleMenuClick = (name) => {
//     setActiveItem(name);
//   };

//   return (
//     <header className="flex justify-between items-center w-full py-3 px-[100px]">
//       {/* Logo */}
//       <img
//         className="h-[85px] object-cover"
//         alt="Design Studio Logo"
//         src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/design-studio-logo-1.png"
//       />

//       {/* Navigation Menu */}
//       <NavigationMenu className="mx-auto">
//         <NavigationMenuList className="flex gap-8 font-['Poppins',Helvetica] text-xl tracking-[0.29px]">
//           {menuItems.map((item, index) => (
//             <NavigationMenuItem key={index} className="relative">
//               <NavigationMenuLink
//                 className={`${activeItem === item.name ? "text-[#03a650]" : "text-black"} tracking-[0.06px] cursor-pointer`}
//                 href={item.href}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleMenuClick(item.name);
//                 }}
//               >
//                 {item.name}
//               </NavigationMenuLink>
//               {activeItem === item.name && (
//                 <div className="absolute h-0.5 bg-[#03a650] top-7 left-0 right-0" />
//               )}
//             </NavigationMenuItem>
//           ))}
//         </NavigationMenuList>
//       </NavigationMenu>

//       {/* Platform Access Button */}
//       <Button className="w-[230px] h-[35px] bg-[#03a650] rounded-[10px] font-['Poppins',Helvetica] font-medium text-neutral-2 text-lg tracking-[0.21px]">
//         Acesso à Plataforma
//       </Button>
//     </header>
//   );
// };

//                 

import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const NavigationSection = () => {
  const [activeItem, setActiveItem] = useState("Início");
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Início", href: "#inicio" },
    { name: "Solução", href: "#solucao" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Contato", href: "#contato" },
  ];

  // Ativa o item com base na rolagem (scrollspy simples)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setScrolled(window.scrollY > 10);
      for (const item of menuItems) {
        const section = document.querySelector(item.href);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(item.name);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center py-0 px-[250px] transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(220,250,225,0.5)] backdrop-blur shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <img
        className="h-[85px] object-cover"
        alt="Design Studio Logo"
        src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/design-studio-logo-1.png"
      />

      {/* Navigation Menu */}
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="flex gap-8 font-['Poppins',Helvetica] text-xl tracking-[0.29px]">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index} className="relative">
              <NavigationMenuLink
                href={item.href}
                className={`${
                  activeItem === item.name ? "text-[#03a650]" : "text-black"
                } tracking-[0.06px] cursor-pointer`}
              >
                {item.name}
              </NavigationMenuLink>
              {activeItem === item.name && (
                <div className="absolute h-0.5 bg-[#03a650] top-7 left-0 right-0" />
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Botão de acesso */}
      <Button className="w-[230px] h-[35px] bg-[#03a650] rounded-[10px] font-['Poppins',Helvetica] font-medium text-neutral-2 text-lg tracking-[0.21px]">
        Acesso à Plataforma
      </Button>
    </header>
  );
};
