import { getProfessions } from "@/api/professions";
import { Character, Profession } from "@/model/model";
import React, { MouseEventHandler, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";
import Announcement from "./annoucement";
import ProfesionService from "./service";
import "./style.css";
import { InternalServerError } from "@/dto/generic";

interface ProfessionsProps {
  character: Character;
  token: string;
  accountId: number;
  serverId: number;
  t: (key: string, options?: any) => string;
}
interface ArrowProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Professions: React.FC<ProfessionsProps> = ({
  character,
  token,
  accountId,
  serverId,
  t,
}) => {
  const [professions, setPartners] = useState<Profession[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const openModal = (profession: Profession) => {
    setSelectedProfession(profession);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfession(null);
  };
  const handleAnnounce = (profession: Profession) => {
    setSelectedProfession(profession);
    setShowConfirmDialog(true);
  };

  const handleConfirmAnnounce = () => {
    Swal.fire({
      icon: "info",
      color: "white",
      background: "#0B1218",
      title: t("professions.messages.announcement-title"),
      text: t("professions.messages.announcement-description"),
      confirmButtonText: "Aceptar",
    }).then(() => {
      setShowConfirmDialog(false);
    });
  };

  const handleCancelAnnounce = () => {
    setShowConfirmDialog(false);
  };

  const refreshProfessions = async () => {
    try {
      const professions = await getProfessions(
        character.id,
        accountId,
        serverId,
        token
      );
      setPartners(professions);
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
    }
  };

  useEffect(() => {
    refreshProfessions();
  }, [character.id, token]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  if (!professions || professions.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-white text-3xl font-bold mb-4">
          {t("professions.empty.title")}
        </p>
        <p className="text-white text-xl">{t("professions.empty.subtitle")}</p>
      </div>
    );
  }

  return (
    <div className="professions-carousel-container">
      <div className="info-section mb-8 p-4 rounded-lg">
        <p className="text-gray-300 text-lg mb-4">
          <strong>{t("professions.question.title")}</strong>
        </p>
        <p className="text-gray-300 text-lg">
          <strong>{t("professions.question.subtitle")}</strong>{" "}
          {t("professions.question.description")}
        </p>
      </div>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        arrows={true}
        infinite={true}
        autoPlay={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-slide"
        containerClass="carousel-container"
        renderButtonGroupOutside={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {professions.map((profession) => (
          <div key={profession.name} className="carousel-slide select-none ">
            <div className=" shadow-md p-10 rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 md:mr-6">
                  <div className="w-64 h-64 flex justify-center items-center overflow-hidden rounded-full bg-gray-500">
                    <img
                      src={profession.logo}
                      alt={profession.name}
                      draggable="false"
                      className="w-full h-full object-cover"
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-1/2 ml-4">
                  <p className="text-gray-300 text-lg font-bold mb-2">
                    {profession.name}
                  </p>
                  <p className="text-gray-300"> lvl: {profession.value}</p>
                  <p className="text-gray-300"> Max: {profession.max}</p>

                  <div className="text-gray-300 text-lg mb-4">
                    {profession.service &&
                    profession.service.description.length > 300
                      ? `${profession.service.description.substring(0, 300)}...`
                      : ""}
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: Math.floor(1) }, (_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">
                        &#9733;
                      </span>
                    ))}
                    {Array.from({ length: 5 - Math.floor(1) }, (_, index) => (
                      <span key={index} className="text-gray-400 text-xl">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-300 text-lg mb-4">
                      {t("professions.description")}
                    </p>
                    {/*
                  profession.service == null ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mb-2 md:mb-0"
                      onClick={() => openModal(profession)}
                    >
                      Publicar en la web
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal(profession)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                      Editar
                    </button>
                  )
                */}

                    <button
                      onClick={() => handleAnnounce(profession)}
                      className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-600 mt-3 focus:outline-none"
                    >
                      {t("professions.btn.send-announcement")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {showConfirmDialog && selectedProfession && (
        <Announcement
          cost={1000}
          serverId={serverId}
          characterId={character.id}
          skillId={selectedProfession.id}
          accountId={accountId}
          token={token}
          onConfirm={handleConfirmAnnounce}
          onCancel={handleCancelAnnounce}
          t={t}
        />
      )}
      {selectedProfession && (
        <ProfesionService
          isOpen={isModalOpen}
          is_public={
            selectedProfession.service != null &&
            selectedProfession.service.is_public
          }
          exist_services={selectedProfession.service != null}
          token={token}
          character_id={character.id}
          skill_id={selectedProfession.id}
          account_id={accountId}
          onClose={closeModal}
          onUpdate={refreshProfessions}
        />
      )}
    </div>
  );
};

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow custom-arrow-left"
      aria-label="Previous Slide"
    >
      &#8592;
    </button>
  );
};

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow custom-arrow-right"
      aria-label="Next Slide"
    >
      &#8594;
    </button>
  );
};

export default Professions;
