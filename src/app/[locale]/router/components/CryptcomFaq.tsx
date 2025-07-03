"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CryptcomFaq = () => {
  const faqs = [
    {
      question: "¿Cómo se hace la encriptación de un celular Cryptcom?",
      answer:
        "Al encriptar el celular con una licencia Cryptcom, se reemplaza el sistema operativo original por uno encriptado de grado militar, con características especiales como chats cifrados, llamadas seguras, destrucción remota, entre otras que puedes conocer en encriptados.io.",
    },
    {
      question:
        "¿Qué funcionalidades voy a tener al encriptar mi celular con Cryptcom?",
      answer:
        "Además de la seguridad y privacidad que ofrece el celular encriptado Cryptcom, tendrás funcionalidades como chats cifrados, borrado remoto, mail cifrado, mensajes temporizados, baúl en la nube y múltiples aplicaciones cifradas.",
    },
    {
      question:
        "¿Cómo funciona el borrado remoto en un celular encriptado como Cryptcom?",
      answer:
        "En caso de perder el teléfono o ser víctima de robo, se podrá enviar una combinación predeterminada de caracteres al propio chat de tu celular Cryptcom para eliminar toda la información. En otros casos, se podrá hacer contactando al proveedor de la licencia.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-10 px-4 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-black font-bold text-2xl mb-8">
          Preguntas frecuentes
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F9F9F9] rounded-xl px-6 py-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-black font-medium text-base">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-black transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="text-gray-600 text-sm mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptcomFaq;
