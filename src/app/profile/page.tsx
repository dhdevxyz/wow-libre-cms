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
} from "@fortawesome/free-solid-svg-icons";

import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LoadingSpinner from "@/components/loading-spinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "./style.css";

import { getCharacters } from "@/api/account/character";
import { AccountDetail, Character, Characters } from "@/model/model";
import Cookies from "js-cookie";
import { getAccountDetail } from "@/api/account";
import CharacterSelection from "@/components/character_selection";
import Friend from "@/components/friends/friend";
import NavbarMinimalist from "@/components/register/navbar";

const Profile = () => {
  const jwt = Cookies.get("jwt");
  const refreshToken = Cookies.get("refresh_token");

  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const router = useRouter();

  /* Api Obtener los personajes del cliente */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Characters = await getCharacters(jwt || "");
        setCharacters(response.characters);
      } catch (error) {
        console.error("Ha ocurrido un error al obtener los personajes", error);
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  /* Api Obtener los personajes del cliente */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AccountDetail = await getAccountDetail(jwt || "");
        if (user) {
          setUser({
            ...user,
            email: response.email,
            cell_phone: response.cell_phone,
            country: response.country,
            last_name: response.last_name,
            first_name: response.first_name,
            date_of_birth: response.date_of_birth,
            account_banned: response.account_banned,
            account_muted: response.account_muted,
          });
        }
        setIsLoading(false); // Marcamos la carga como completada
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido obtener el detalle",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
        router.push("/");
      }
    };

    fetchData();
  }, [setIsLoading]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center ">
        <div className="flex flex-col items-center">
          <LoadingSpinner />{" "}
          <p className="mt-4 text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor mx-auto ">
      <NavbarMinimalist />

      {/* Sección de perfil */}
      <div className="flex flex-col items-center justify-center py-20 ">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar del usuario"
          className="w-36 h-36 rounded-full mb-4 box-shadow-primary"
        />
        <div className="text-center ">
          <h1 className="text-white text-4xl font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-white  pb-2 text-2xl ">Email: {user.email}</p>
          <p className="text-white  pb-2 text-2xl ">Pais: {user.country}</p>
          <p className="text-white  pb-2 text-2xl ">
            Username: {user.username}
          </p>
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
              <Tab className="py-6 px-6 text-white  bg-profile2 cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2 text-2xl" />
                Amigos
              </Tab>
              <Tab className="py-6 px-6 text-white bg-profile2 first-letter:text-white   cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-2xl" />
                Notificaciones
              </Tab>
              <Tab className="py-6 px-6 text-white bg-profile2  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-2xl" />
                Perfil
              </Tab>
              <Tab className="py-6 px-6 text-white  bg-profile2 cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faClipboard} className="mr-2 text-2xl" />
                Movimientos
              </Tab>
              <Tab className="py-6 px-6 text-white  bg-profile2 cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faShieldHeart}
                  className="mr-2 text-2xl"
                />
                Seguridad
              </Tab>
              <Tab className="py-6 px-6 text-white bg-profile2  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                Cuenta
              </Tab>
            </TabList>

            {/* Separadores verticales (ocultos en pantallas pequeñas) */}
            <div className="lg:border-l border-gray-300 hidden lg:block"></div>

            {/* Paneles de las pestañas */}
            <div className="w-full px-4">
              <TabPanel>
                {/* Contenido de la pestaña Amigos */}
                {selectedCharacter && (
                  <Friend character={selectedCharacter} token={jwt || ""} />
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Notificaciones */}
                <div className="p-4">
                  Contenido de la pestaña Notificaciones
                </div>
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Transacciones */}
                <div className="p-4">Contenido de la pestaña Transacciones</div>
              </TabPanel>
              <TabPanel>{/* Contenido de la pestaña Seguridad Web */}</TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Seguridad Ingame */}
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
