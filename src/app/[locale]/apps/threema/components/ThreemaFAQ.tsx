"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ThreemaFAQ = () => {
  const faqs = [
    {
      question: "¿Para qué sirve la aplicación Threema?",
      answer:
        "Threema es una aplicación de mensajería encriptada que sirve para proteger las comunicaciones privadas. Threema no solo es un servicio de mensajería privada y cifrado, sino que además es versátil y ofrece multitud de posibilidades.",
    },
    {
      question: "¿Cómo funciona la aplicación Threema?",
      answer:
        "Threema es un código abierto que permite hacer llamadas y videollamadas cifradas de extremo a extremo y ofrece todas las opciones deseables de una aplicación de mensajería instantánea con tecnología punta.",
    },
    {
      question:
        "¿Qué tal es la seguridad y privacidad de la aplicación Threema?",
      answer:
        "Threema es bastante segura y completa. Gracias a su sistema de cifrado y a su versatilidad y sencillez, es una de las mejores aplicaciones de mensajería privada en el mundo. Nadie aparte del emisor y receptor del mensaje podrá acceder a la información. Ingresa y conoce más.",
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

export default ThreemaFAQ;
