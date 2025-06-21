import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactSection = () => {
  // Form field data for mapping
  const formFields = [
    { id: "name", label: "Nome*", type: "input" },
    { id: "email", label: "Email*", type: "input" },
    { id: "phone", label: "Telefone", type: "input" },
    { id: "description", label: "Descreva sua necessidade", type: "textarea" },
  ];

  return (
    <section id="contato" className="w-full py-16 bg-linear-2">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className=" text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-12 [font-family:'Poppins',Helvetica]">
          Solicite Um Plano Personalizado
        </h2>

        <div className="max-w-4xl mx-auto">
          <form className="space-y-4">
            {formFields.map((field) => (
              <Card
                key={field.id}
                className="bg-[#ebffef4c] shadow-md rounded-[0.25rem]"
              >
                <CardContent className="p-0">
                  {field.type === "input" ? (
                    <Input
                      id={field.id}
                      placeholder={field.label}
                      className="border-none h-[2.5rem] bg-transparent [font-family:'Poppins',Helvetica] font-extralight text-[#052461] text-base md:text-lg lg:text-xl px-[2.25rem] placeholder:text-[#052461]"
                    />
                  ) : (
                    <Textarea
                      id={field.id}
                      placeholder={field.label}
                      className="border-none h-[13rem] bg-transparent [font-family:'Poppins',Helvetica] font-extralight text-[#052461] text-base md:text-lg lg:text-xl px-[2.25rem] py-5 placeholder:text-[#052461] resize-none"
                    />
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-start mt-6">
              <Button
                type="submit"
                className="w-[20rem] h-[2.5rem] bg-[#03a650] rounded-[0.3rem] shadow-md [font-family:'Poppins',Helvetica] font-bold text-white text-[1.6rem]"
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
