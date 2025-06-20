import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import { Menu } from "lucide-react"; // ou use qualquer ícone de hamburguer

export const NavigationSection = () => {
  const [activeItem, setActiveItem] = useState("Início");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "#inicio" },
    { name: "Solução", href: "#solucao" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Contato", href: "#contato" },
  ];

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[rgba(220,250,225,0.5)] backdrop-blur md:shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-1">
        {/* Logo */}
        <img
          className="h-[95px] sm:h-[105px]"
          alt="EPIGuard Logo"
          src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/design-studio-logo-1.png"
        />

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8 font-['Poppins',Helvetica] text-lg">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative transition-colors ${
                activeItem === item.name ? "text-[#03a650]" : "text-black"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.name}
              {activeItem === item.name && (
                <div className="absolute h-0.5 bg-[#03a650] -bottom-1 left-0 right-0" />
              )}
            </a>
          ))}
        </nav>

        {/* Botão Desktop */}
        <div className="hidden md:block">
          <Button
            className="bg-[#03a650] hover:bg-[#038a42] w-[200px] h-[35px] rounded-[10px] text-white font-medium"
            onClick={() => window.location.href = '/login'}
          >
            Acesso à Plataforma
          </Button>
        </div>

        {/* Hamburguer Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-7 h-7 text-[#03a650]" />
          </button>
        </div>
      </div>

      {/* Menu Mobile Expandido */}
      {menuOpen && (
        <div className="md:hidden px-4 py-2 bg-[rgba(220,250,225,0.95)] backdrop-blur">
          <nav className="flex flex-col gap-1 text-base font-['Poppins',Helvetica]">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`py-1 ${
                  activeItem === item.name ? "text-[#03a650]" : "text-black"
                }`}
                onClick={(e) => {
                  e.preventDefault(); // impede o comportamento padrão
                  const section = document.querySelector(item.href);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                  setActiveItem(item.name);
                  setTimeout(() => setMenuOpen(false), 100);
                }}
              >
                {item.name}
              </a>
            ))}
            <Button className="mt-1 w-full bg-[#03a650] hover:bg-[#038a42] text-white font-medium rounded-[10px] h-[40px]" onClick={() => window.location.href = '/login'}>
              Acesso à Plataforma
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
