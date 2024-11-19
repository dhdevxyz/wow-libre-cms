import { claimBenefitsPremium, getBenefitsPremium } from "@/api/subscriptions";
import {
  PromotionsModel,
  SubscriptionBenefits,
  SubscriptionsBenefit,
} from "@/model/model";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utilities/loading-spinner";
import Swal from "sweetalert2";
import { claimPromotion, getPromotions } from "@/api/promotions";

interface PremiumProps {
  serverId: number;
  accountId: number;
  characterId: number;
  language: string;
  token: string;
}

const Promotions: React.FC<PremiumProps> = ({
  serverId,
  accountId,
  characterId,
  language,
  token,
}) => {
  const [subscription, setSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [subscriptionBenefits, setSubscriptionBenefits] = useState<
    PromotionsModel[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const subscriptionData = await getPromotions(
          language,
          token,
          serverId,
          accountId,
          characterId
        );
        setSubscriptionBenefits(subscriptionData.promotions);
        setSubscription(subscriptionData.size > 0);
      } catch (error) {
        console.error("Error fetching subscription benefits:", error);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchBanners();
  }, [language, token, refresh, characterId]);

  const handleButtonClick = async (promotionId: number): Promise<void> => {
    try {
      const response = await claimPromotion(
        serverId,
        accountId,
        characterId,
        promotionId,
        language,
        token
      );
      setRefresh(true);
      setCurrentPage(1);
      Swal.fire({
        icon: "success",
        title: "¡Beneficio reclamado con éxito! 🎉",
        text: "Tu recompensa ahora está disponible. ¡Disfrútala!",
        color: "white",
        background: "#0B1218",
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#1DB954", // Un verde vibrante para destacar
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
      });
      return;
    }
  };

  // Calcular los elementos actuales según la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscriptionBenefits.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(subscriptionBenefits.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="contenedor flex items-center justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-neon_green p-8 rounded-lg shadow-lg">
      {subscriptionBenefits.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 gap-4">
            {currentItems.map((card, index) => (
              <div key={index} className="p-4">
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                    {card.name}
                  </h3>
                  <p className="text-gray-200 mb-4 text-lg">
                    {card.description}
                  </p>
                  <button
                    onClick={() => handleButtonClick(card.id)}
                    className="w-full font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    {card.btn_txt}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de paginación */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 text-yellow-500">
              Actualmente no existen promociones disponibles
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              Adquiere una suscripción mensual y desbloquea increíbles
              beneficios.
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
                  Copias de seguridad automáticas de tus personajes en
                  servidores asociados
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                Soporte Prioritario
              </h3>
              <p className="text-gray-200">
                Obtén asistencia rápida y prioritaria para cualquier duda o
                problema que tengas.
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
      )}
    </div>
  );
};

export default Promotions;
