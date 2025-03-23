const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with our basic features.",
    features: [
      "Vinculaciones ilimitadas",
      "Trafico ilimitado",
      "Lading page",
      "Dashboard",
      "Requiere integrar plan VIP",
      "Launcher (Proximamente)",
    ],
    buttonText: "Sign Up",
  },
  {
    name: "Pro",
    price: "$50/mo",
    description: "Perfect for small businesses and startups.",
    features: [
      "Vinculaciones ilimitadas",
      "Trafico ilimitado",
      "Lading page",
      "Dashboard",
      "Soporte prioritario",
      "Servidor dedicado, 20 GB RAM",
      "Descargas ilimitadas",
      "Vinculacion automatica",
      "Marketing en redes sociales",
      "Instalacion web (Fusion Cms)",
      "Modulos Azeroth Core a tu disposicion",
      "Dominio personalizado",
      "Sin obligación de plan VIP",
      "App Mobile (Proximamente)",
      "Launcher (Proximamente)",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Starter",
    price: "$15/mo",
    description: "Perfect for small businesses and startups.",
    features: [
      "Vinculaciones ilimitadas",
      "Trafico ilimitado",
      "Lading page",
      "Dashboard",
      "Soporte prioritario",
      "Servidor dedicado, 20 GB RAM",
      "Descargas ilimitadas",
      "Vinculacion automatica",
      "Marketing en redes sociales",
      "Instalacion web",
      "App Mobile (Proximamente)",
      "Launcher (Proximamente)",
      "Dominio personalizado",
      "Sin obligación de plan VIP",
    ],
    buttonText: "Get Started",
  },
];

export default function PricingPlans() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
          Planes de precios
        </h1>
        <p className="mt-4 text-2xl text-gray-400">
          Simple, transparent pricing for your business needs.
        </p>
      </div>

      <div
        className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12 px-4 ${
          plans.length < 4 ? "justify-center" : ""
        } flex flex-wrap`}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-4 text-gray-400">{plan.description}</p>
            <div className="my-8">
              <span className="text-5xl font-extrabold text-white">
                {plan.price}
              </span>
            </div>
            <ul className="mb-8 space-y-2 text-xl text-gray-400">
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
              href="#"
              className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
