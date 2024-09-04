"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faCog,
  faUser,
  faClipboard,
  faComment,
  faEnvelope,
  faShieldHeart,
  faCrown,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import "../style.css";

import { getCharacters } from "@/api/account/character";
import { AccountDetailDto, Character, Characters } from "@/model/model";
import Cookies from "js-cookie";
import CharacterSelection from "@/components/character_selection";
import Friend from "@/components/friends/friend";
import { getAccount } from "@/api/account";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import DetailAccount from "@/components/account";
import Mails from "@/components/account/mails";
import useAuth from "@/hook/useAuth";
import Professions from "@/components/professions";
import AccountGuild from "@/components/account/guild";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const AccountDetail = () => {
  const searchParams = useSearchParams();

  const token = Cookies.get("token");
  const accountId = Number(searchParams.get("id"));
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<AccountDetailDto>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");

  useAuth("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accountId && token) {
          setIsLoading(true);

          const [charactersResponse, accountDetailResponse] = await Promise.all(
            [getCharacters(token, accountId), getAccount(token, accountId)]
          );

          setCharacters(charactersResponse.characters);
          setUserDetail(accountDetailResponse);
        } else {
          router.push("/account");
        }
      } catch (error) {
        console.error("Ha ocurrido un error al obtener los datos", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido obtener los detalles",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
        router.push("/account");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [accountId, token]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setAvatar(character.race_logo || "https://via.placeholder.com/150");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
          <p className="mt-4 text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor mx-auto">
      ​
      <NavbarAuthenticated />
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src={avatar}
          alt="Avatar del usuario"
          className="w-36 h-36 rounded-full mb-4 box-shadow-primary"
        />
        <div className="text-center w-full max-w-md">
          <button
            onClick={togglePanel}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
              isPanelOpen ? "bg-transparent" : "bg-transparent"
            } text-white transition-colors duration-300`}
          >
            <span className="text-lg font-semibold">
              {isPanelOpen ? "Ocultar detalles" : "Mostrar detalles"}
            </span>
            <FontAwesomeIcon
              icon={isPanelOpen ? faChevronUp : faChevronDown}
              className="text-xl ml-2"
            />
          </button>
          {isPanelOpen && (
            <div className="mt-4  p-4 rounded-lg shadow-lg">
              <h2 className="text-white text-2xl font-bold">
                Detalles del personaje
              </h2>
              <p className="text-white text-lg mt-2">
                <strong>Nombre:</strong> {userDetail?.account_web.first_name}{" "}
                {userDetail?.account_web.last_name}
              </p>
              <p className="text-white text-lg mt-2">
                <strong>Email:</strong> {userDetail?.email}
              </p>
              <p className="text-white text-lg mt-2">
                <strong>País:</strong> {userDetail?.account_web.country}
              </p>
              <p className="text-white text-lg mt-2">
                <strong>Username:</strong> {userDetail?.username}
              </p>
            </div>
          )}
          <div className="mt-4">
            {!isLoading && characters.length > 0 ? (
              <CharacterSelection
                characters={characters}
                onSelectCharacter={handleSelectCharacter}
              />
            ) : (
              <p className="text-white">No hay personajes disponibles</p>
            )}
          </div>
        </div>
      </div>
      {/* Secciones con pestañas */}
      <div className="mt-10  bg-profile eyelashes box-shadow-primary  overflow-hidden">
        <Tabs>
          <div className="flex flex-col lg:flex-row">
            {/* TabList para móviles (oculto en pantallas grandes) */}
            <TabList className=" flex flex-col border-b">
              <Tab className="py-6 px-6 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2 text-2xl" />
                Amigos
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-2xl" />{" "}
                Mensajes
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-2xl" />{" "}
                Cuenta
              </Tab>
              <Tab className="py-6 px-6 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faClipboard} className="mr-2 text-2xl" />
                Inventario
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faShieldHeart}
                  className="mr-2 text-2xl"
                />
                Profesiones
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faFlag} className="mr-2 text-2xl" />
                Hermandad
              </Tab>
              <Tab className="py-6 px-5 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faCrown} className="mr-2 text-2xl" />{" "}
                Premium
              </Tab>
            </TabList>

            {/* Separadores verticales (ocultos en pantallas pequeñas) */}
            <div className="lg:border-l border-gray-300 hidden lg:block"></div>

            {/* Paneles de las pestañas */}
            <div className="w-full px-4">
              <TabPanel>
                {/* Contenido de la pestaña Amigos */}
                {selectedCharacter && token && accountId && (
                  <Friend
                    character={selectedCharacter}
                    token={token}
                    account_id={accountId}
                  />
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Notificaciones */}
                {selectedCharacter && token && (
                  <Mails token={token} character_id={selectedCharacter.id} />
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
                {userDetail && token ? (
                  <DetailAccount account={userDetail} token={token} />
                ) : null}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Inventario */}
                <div className="p-4">Contenido de la pestaña Inventario</div>
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Profesiones */}
                {selectedCharacter && token && accountId && (
                  <Professions
                    character={selectedCharacter}
                    token={token}
                    account_id={accountId}
                  />
                )}
              </TabPanel>
              <TabPanel>
                {selectedCharacter && token && accountId && (
                  <AccountGuild
                    character_id={selectedCharacter.id}
                    token={token}
                    account_id={accountId}
                  />
                )}
              </TabPanel>

              <TabPanel>{/* Contenido de la pestaña Premim */}</TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountDetail;
