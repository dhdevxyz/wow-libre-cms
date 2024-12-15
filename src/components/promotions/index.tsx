import { claimPromotion, getPromotions } from "@/api/promotions";
import { PromotionsModel } from "@/model/model";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../utilities/loading-spinner";
import { InternalServerError } from "@/dto/generic";

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
      await claimPromotion(
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
      if (error instanceof InternalServerError) {
        Swal.fire({
          icon: "error",
          title: "Opss!",
          html: `
            <p><strong>Message:</strong> ${error.message}</p>
            <hr style="border-color: #444; margin: 8px 0;">
            <p><strong>Transaction ID:</strong> ${error.transactionId}</p>
          `,
          color: "white",
          background: "#0B1218",
        });
        return;
      }
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
        <div className="max-w-full mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentItems.map((card, index) => (
              <div key={index} className="p-4">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between h-[330px]">
                  {/* Imagen */}
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />

                  {/* Contenido */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                      {card.name}
                    </h3>
                    <p className="text-gray-200 mb-4 text-lg overflow-hidden text-ellipsis">
                      {card.description}
                    </p>

                    {/* Niveles */}
                    <div className="flex items-center justify-between text-gray-200 mb-4 text-lg">
                      <span className="flex-grow text-center font-semibold">
                        <span className="text-white">Lvl Minimo </span>
                        {card?.min_lvl}
                      </span>
                      <span className="mx-1 text-gray-400">-</span>
                      <span className="flex-grow text-center font-semibold">
                        <span className="text-white">Lvl Maximo </span>
                        {card?.max_lvl}
                      </span>
                    </div>
                  </div>

                  {/* Botón */}
                  <button
                    onClick={() => handleButtonClick(card.id)}
                    className="w-full font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg mt-auto"
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
        <div className="min-w-[300px] min-h-[340px]">
          {/* Título y mensaje principal */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 text-yellow-500">
              Actualmente no tenemos promociones disponibles
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              ¡No te preocupes! Únete a nuestros canales de comunicación y
              mantente informado sobre futuras promociones.
            </p>
            <p className="text-xl font-semibold">Solo por {`$9.99`} al mes</p>
          </div>

          {/* Beneficios y Soporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promociones Exclusivas */}
            <div className="bg-gray-800 p-4 rounded-lg ">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                Promociones Exclusivas
              </h3>
              <ul className="list-disc list-inside text-gray-200 text-xl">
                <li>Acceso a regalos y beneficios especiales</li>
              </ul>
            </div>

            {/* Soporte Prioritario */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                Soporte Prioritario
              </h3>
              <p className="text-gray-200 text-xl">
                Si tienes algún inconveniente con una promoción, dirígete a
                nuestro canal de soporte y explica tu caso para recibir ayuda
                rápida.
              </p>
            </div>
          </div>

          {/* Botón de enlace */}
          <div className="mt-10">
            <Link
              href="https://t.me/+jOZFCLD5TXAxOWRh"
              className="block w-full text-center font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg"
            >
              Mantente al tanto de nuestras novedades en los canales
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;
