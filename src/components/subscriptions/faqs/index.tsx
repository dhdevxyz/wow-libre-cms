import React, { useState } from "react";

const FaqsSubscriptions = () => {
  const faqs = [
    {
      question: "¿Cuál es el horario de atención?",
      answer:
        "Nuestro horario de atención es de lunes a sábado, de 9:00 AM a 6:00 PM.",
    },
    {
      question: "¿Qué beneficios obtengo con una suscripción?",
      answer:
        "Al suscribirte, tendrás acceso a servicios gratuitos para todas tus cuentas vinculadas en World of Warcraft. Además, recibirás regalos mensuales que incluyen monturas y objetos exclusivos para mejorar tu experiencia de juego.",
    },
    {
      question: "¿Qué debo hacer después de realizar el pago?",
      answer:
        "Dado que nuestra plataforma aún está ajustando el sistema de pagos automáticos, te pedimos que, después de realizar el pago, envíes el comprobante de la transacción para confirmar tu suscripción.",
    },
    {
      question: "¿Ofrecen soporte técnico?",
      answer:
        "Sí, ofrecemos soporte técnico prioritario para nuestros suscriptores durante nuestro horario de atención.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="contenedor">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <h2 className="text-3xl font-bold text-start text-white mb-8">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <button
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center w-full text-left text-xl font-bold text-white"
              >
                <span className="text-xl">{faq.question}</span>
                <span className=" text-white">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="mt-2 text-gray-300 text-lg">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqsSubscriptions;
