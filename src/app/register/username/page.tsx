"use client";

import PageCounter from "@/components/register/counter";
import TitleWow from "@/components/utilities/serverTitle";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../style.css";
import useAuth from "@/hook/useAuth";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import { ServerModel } from "@/model/model";
import { getServers } from "@/api/account/servers";
import Cookies from "js-cookie";

const AccountIngame = () => {
  const { user, setUser } = useUserContext();
  const [userName, setUsername] = useState("");
  const [servers, setServers] = useState<ServerModel[]>([]);
  const [selectedServer, setSelectedServer] = useState<{
    name: string;
    expansion: string;
  } | null>(null); // Cambiar a objeto para almacenar ambos
  const router = useRouter();
  const { t } = useTranslation();
  const token = Cookies.get("token");

  useAuth(t("errors.message.expiration-session"));

  useEffect(() => {
    if (token == null) {
      return;
    }
    const fetchServers = async () => {
      try {
        const serversData = await getServers(token);
        setServers(serversData);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los servidores.",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    };

    fetchServers();
  }, [token]);

  const handleServerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedServerName = event.target.value;
    const server = servers.find((server) => server.name === selectedServerName); // Filtrar solo por server.name
    if (server) {
      setSelectedServer({ name: server.name, expansion: server.expansion });
    }
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedServer) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No ha seleccionado ningún servidor.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (!userName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.username-empty"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (userName.trim().length < 5 || userName.trim().length > 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.username-invalid-length"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (user && selectedServer) {
      setUser({
        ...user,
        username: userName,
        server: selectedServer.name,
        expansion: selectedServer.expansion,
      });
    }
    router.push("/register/account-ingame");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="contenedor ">
      <NavbarAuthenticated />
      <div className="register register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.account-game.title-server-message"
          )}
        />
        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            {/* Select para elegir expansión */}
            <label
              htmlFor="expansionSelect"
              className="mb-2 register-container-form-label"
            >
              Servidor
            </label>
            <select
              id="expansionSelect"
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              value={selectedServer?.name || ""} // Mostrar solo el nombre del servidor
              onChange={handleServerChange}
            >
              <option value="" disabled>
                {t("bank.bank_characters.select-account")}
              </option>
              {servers.map((server) => (
                <option key={server.id} value={server.name}>
                  {server.name} - {server.exp_name}{" "}
                  {/* Mostrar ambos en el select */}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de nombre de usuario */}
          <div className="form-group">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.account-game.username-txt")}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder={t(
                "register.section-page.account-game.username-placeholder"
              )}
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>

          <PageCounter currentSection={1} totalSections={2} />
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.account-game.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.account-game.button.btn-secondary")}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AccountIngame;
