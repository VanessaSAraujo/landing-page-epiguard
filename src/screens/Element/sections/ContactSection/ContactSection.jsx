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
                className="bg-[#ebffef4c] shadow-[0px_4.04px_8.08px_#00000026] rounded-[4.04px]"
              >
                <CardContent className="p-0">
                  {field.type === "input" ? (
                    <Input
                      id={field.id}
                      placeholder={field.label}
                      className="border-none h-[41px] bg-transparent [font-family:'Poppins',Helvetica] font-extralight text-[#052461] text-base md:text-lg lg:text-xl px-9 placeholder:text-[#052461]"
                    />
                  ) : (
                    <Textarea
                      id={field.id}
                      placeholder={field.label}
                      className="border-none h-[207px] bg-transparent [font-family:'Poppins',Helvetica] font-extralight text-[#052461] text-base md:text-lg lg:text-xl px-9 py-5 placeholder:text-[#052461] resize-none"
                    />
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-start mt-6">
              <Button
                type="submit"
                className="w-[330px] h-[41px] bg-[#03a650] rounded-[5px] shadow-[0px_4.04px_8.08px_#10133026] [font-family:'Poppins',Helvetica] font-bold text-white text-[25px]"
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
