import { claimPromotion, getPromotions } from "@/api/promotions";
import { PromotionsModel } from "@/model/model";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../utilities/loading-spinner";
import { InternalServerError } from "@/dto/generic";

interface PremiumProps {
  classId: number;
  serverId: number;
  accountId: number;
  characterId: number;
  language: string;
  token: string;
  t: (key: string, options?: any) => string;
}

const Promotions: React.FC<PremiumProps> = ({
  classId,
  serverId,
  accountId,
  characterId,
  language,
  token,
  t,
}) => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [subscriptionBenefits, setSubscriptionBenefits] = useState<
    PromotionsModel[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const promotionsData = await getPromotions(
          language,
          token,
          serverId,
          accountId,
          characterId,
          classId
        );
        setSubscriptionBenefits(promotionsData.promotions);
      } catch (error) {
        setLoading(false);
        setRefresh(false);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchPromos();
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
        title: t("promotions-character.messages.title-success-claim-promo"),
        text: t("promotions-character.messages.text-success-claim-promo"),
        color: "white",
        background: "#0B1218",
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#1DB954",
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
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between h-[330px] transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-gray-800 hover:via-black hover:to-gray-900">
                  {/* Imagen */}
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4 "
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
                        <span className="text-white">
                          {t("promotions-character.lvl-min")}
                        </span>{" "}
                        {card?.min_lvl}
                      </span>
                      <span className="mx-1 text-gray-400">-</span>
                      <span className="flex-grow text-center font-semibold">
                        <span className="text-white">
                          {t("promotions-character.lvl-max")}
                        </span>{" "}
                        {card?.max_lvl}
                      </span>
                    </div>
                  </div>

                  {/* Botón */}
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
              {t("promotions-character.btns.pagination-return")}
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              {t("promotions-character.btns.pagination-next")}
            </button>
          </div>
        </div>
      ) : (
        <div className="min-w-[300px] min-h-[390px]">
          {/* Título y mensaje principal */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 text-yellow-500">
              {t("promotions-character.promotion-empty.title")}
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              {t("promotions-character.promotion-empty.subtitle")}
            </p>
            <p className="text-xl text-gray-300 font-semibold">
              {t("promotions-character.promotion-empty.description")}
            </p>
          </div>

          {/* Beneficios y Soporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promociones Exclusivas */}
            <div className="bg-gray-800 p-4 rounded-lg ">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                {t("promotions-character.promotion-empty.benefit-promo.title")}
              </h3>
              <ul className="list-disc list-inside text-gray-200 text-xl">
                <li>
                  {t(
                    "promotions-character.promotion-empty.benefit-promo.benefits.primary"
                  )}
                </li>
              </ul>
            </div>

            {/* Soporte Prioritario */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                {t("promotions-character.promotion-empty.support-promo.title")}
              </h3>
              <p className="text-gray-200 text-xl">
                {t(
                  "promotions-character.promotion-empty.support-promo.description"
                )}
              </p>
            </div>
          </div>

          {/* Botón de enlace */}
          <div className="mt-10">
            <Link
              href="https://chat.whatsapp.com/KpvQJSOAujI4DlYjweWDxW"
              className="block w-full text-center font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg"
            >
              {t("promotions-character.promotion-empty.btn-invitation")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;
