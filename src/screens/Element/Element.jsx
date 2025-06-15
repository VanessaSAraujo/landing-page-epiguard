import React from "react";
import { BenefitsSection } from "./sections/BenefitsSection";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { NavigationSection } from "./sections/NavigationSection/NavigationSection";
import { SolutionsSection } from "./sections/SolutionsSection/SolutionsSection";

export const Element = () => {
  return (
    <div className="bg-white flex flex-col w-full" data-model-id="1:7414">
      <div className="bg-white w-full relative">
        <HeroSection />
        <SolutionsSection />
        <BenefitsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};
