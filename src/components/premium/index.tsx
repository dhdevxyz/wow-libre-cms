import Link from "next/link";
import React, { useState } from "react";

const Premium = () => {
  const [subscription, setSubscription] = useState(true);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-neon_green p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-4 text-yellow-500">
          ¡Adquiere un plan mensual!
        </h2>
        <p className="text-lg text-gray-300 mb-2">
          Adquiere una suscripción mensual y desbloquea increíbles beneficios.
        </p>
        <p className="text-xl font-semibold">Solo por {`$9.99`} al mes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
            Beneficios Exclusivos
          </h3>
          <ul className="list-disc list-inside text-gray-200">
            <li>Acceso a eventos especiales</li>
            <li>Descuentos en productos</li>
            <li>Migraciones rápidas y seguras a otros servidores</li>
            <li>
              Protección garantizada: tus personajes migrados sin pérdida de
              datos
            </li>
            <li>
              Copias de seguridad automáticas de tus personajes en servidores
              asociados
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
            Soporte Prioritario
          </h3>
          <p className="text-gray-200">
            Obtén asistencia rápida y prioritaria para cualquier duda o problema
            que tengas.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/subscriptions"
          className="block w-full text-center font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg"
        >
          ¡Adquiere tu Suscripción!
        </Link>
      </div>
    </div>
  );
};

export default Premium;
