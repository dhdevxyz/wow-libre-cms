"use client";

import { useTranslation } from "react-i18next";

const plans = [
  {
    name: "Gratis",
    price: "$0",
    description: "Empieza sin costo y accede a nuestras funciones esenciales.",
    features: [
      "Vinculaciones ilimitadas",
      "Tráfico sin restricciones",
      "Landing page incluida",
      "Dashboard para gestionar todo",
      "Requiere integración con plan VIP",
      "Launcher (Próximamente)",
    ],
    buttonText: "¡Regístrate Gratis!",
    url: "https://www.wowlibre.com/register",
  },
  {
    name: "Pro",
    price: "$300/año",
    description:
      "La mejor opción para empresas y startups. Solo $25/mes facturado anualmente.",
    features: [
      "Vinculaciones ilimitadas",
      "Tráfico sin restricciones",
      "Landing page personalizada",
      "Dashboard avanzado",
      "Sin obligación de plan VIP",
      "App móvil (Próximamente)",
      "Launcher (Próximamente)",
      "Soporte prioritario",
      "Servidor VPS incluido",
      "Monitoreo y alertas 24/7",
      "Descargas de recursos ilimitadas",
      "Vinculación automática",
      "Estrategias de marketing en redes",
      "Instalación web completa",
      "Módulos Azeroth Core",
      "Dominio personalizado gratis",
    ],
    buttonText: "¡Adquiere el Plan Pro!",
    url: "https://wa.link/ab85xk",
  },
  {
    name: "Starter",
    price: "$192 cada 6 meses",
    description:
      "Ideal para pequeñas empresas y emprendedores. Solo $30/mes facturado cada 6 meses.",
    features: [
      "Vinculaciones ilimitadas",
      "Tráfico sin restricciones",
      "Landing page personalizada",
      "Dashboard avanzado",
      "Sin obligación de plan VIP",
      "App móvil (Próximamente)",
      "Launcher (Próximamente)",
      "Soporte prioritario",
      "Servidor VPS incluido",
      "Monitoreo y alertas 24/7",
      "Descargas de recursos ilimitadas",
      "Vinculación automática",
      "Estrategias de marketing en redes",
      "Instalación web completa",
      "Módulos Azeroth Core",
      "Dominio personalizado gratis",
    ],
    buttonText: "¡Empieza Ahora!",
    url: "https://wa.link/ab85xk",
  },
  {
    name: "Mensual",
    price: "$35/mes",
    description:
      "La flexibilidad que necesitas. Pago mensual de $35, con un pago inicial adicional por el dominio.",
    features: [
      "Vinculaciones ilimitadas",
      "Tráfico sin restricciones",
      "Landing page personalizada",
      "Dashboard avanzado",
      "Sin obligación de plan VIP",
      "App móvil (Próximamente)",
      "Launcher (Próximamente)",
      "Soporte prioritario",
      "Servidor VPS incluido",
      "Monitoreo y alertas 24/7",
      "Descargas de recursos ilimitadas",
      "Vinculación automática",
      "Dominio personalizado (requiere pago inicial)",
      "Instalación web completa",
    ],
    buttonText: "¡Suscríbete Hoy!",
    url: "https://wa.link/ab85xk",
  },
];

export default function PricingPlans() {
  const { t } = useTranslation();

  return (
    <section className="py-12 contenedor mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
          {t("plans-and-pricing.title")}
        </h1>
        <p className="mt-4 text-2xl text-gray-400">
          {t("plans-and-pricing.description")}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12 px-4 ${
          plans.length < 4 ? "justify-center" : ""
        } flex flex-wrap`}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 flex flex-col h-full"
          >
            <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-4 text-gray-400 text-xl">{plan.description}</p>
            <div className="my-8">
              <span className="text-5xl font-extrabold text-white">
                {plan.price}
              </span>
            </div>
            <ul className="mb-8 space-y-2 text-xl text-gray-400 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={plan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 mt-auto"
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
