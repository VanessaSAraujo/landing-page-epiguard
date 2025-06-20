import React from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

export const FooterSection = () => {
  // Navigation links data
  const navLinks = [
    { text: "Início", href: "#inicio" },
    { text: "Solução", href: "#solucao" },
    { text: "Benefícios", href: "#beneficios" },
    { text: "Contato", href: "#contato" },
  ];

  // Social media icons data
  const socialIcons = [
    {
      name: "WhatsApp",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/ri-whatsapp-line.svg",
      alt: "WhatsApp icon",
    },
    {
      name: "Twitter/X",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/pajamas-x.svg",
      alt: "X icon",
      hasBg: true,
    },
    {
      name: "Facebook",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/ri-facebook-fill.svg",
      alt: "FacebookIcon icon",
    },
    {
      name: "Instagram",
      icon: "https://c.animaapp.com/mbx4o6k4UxAFO0/img/ri-instagram-line.svg",
      alt: "InstagramIcon icon",
    },
  ];

  return (
    <footer className="w-full bg-transparent relative">
      <div className="relative w-full">
        <img
          className="w-full h-[403px] object-cover"
          alt="Footer background"
          src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/banner-rodape.png"
        />

        {/* Green line at the top */}
        <div className="w-full h-[5px] absolute top-0 left-0 bg-[#03a650]" />

        {/* Logo */}
        <img
          className="absolute w-[249px] h-36 top-[18px] left-1/2 -translate-x-1/2 object-cover"
          alt="EPIGUARD logo"
          src="https://c.animaapp.com/mbx4o6k4UxAFO0/img/design-studio-logo-1-1.svg"
        />

        {/* Social Media Icons */}
        <div className="flex items-end gap-5 absolute top-48 left-1/2 -translate-x-1/2">
          {socialIcons.map((social, index) =>
            social.hasBg ? (
              <div
                key={index}
                className="relative w-12 h-12 bg-[#03a650] rounded-[126.32px]"
              >
                <img
                  className="absolute w-6 h-6 top-3 left-3"
                  alt={social.alt}
                  src={social.icon}
                />
              </div>
            ) : (
              <img
                key={index}
                className="relative w-12 h-12"
                alt={social.alt}
                src={social.icon}
              />
            ),
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden custom:flex justify-center gap-[100px] absolute top-[270px] left-1/2 -translate-x-1/2 w-full">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="font-['Poppins',Helvetica] font-normal text-[#03a650] text-xl tracking-[2.00px]"
            >
              {link.text}
            </a>
          ))}

          <Link
            to="/login"
            className="flex items-center justify-center h-[30px] bg-[#03a650] rounded-[20px] px-4 font-['Poppins',Helvetica] font-normal text-[#f2f2f2] text-xl tracking-[2.00px] hover:bg-[#028c3a] transition-colors"
          >
            Acesso à Plataforma
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="absolute w-full bottom-[32px] left-1/2 -translate-x-1/2 px-[120px]">
          <div className="w-full h-px bg-[#03a650]" />
          <div className="mt-4 font-['Poppins',Helvetica] font-normal text-[#f2f2f2] text-base">
            © 2025 EPIGUARD&nbsp;&nbsp;•&nbsp;&nbsp;Todos os direitos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};
