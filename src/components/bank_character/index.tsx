"use client";
import { getAccounts } from "@/api/account";
import { getServersBanks } from "@/api/account/bank";
import { applyForBankLoan, potentialClients } from "@/api/bank";
import { useUserContext } from "@/context/UserContext";
import { AccountsModel, Character, ServerAvailableBank } from "@/model/model";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface GuildCharacterProps {
  isOpen: boolean;
  token: string;
  planId: number;
  onClose: () => void;
}

const BankCharacter: React.FC<GuildCharacterProps> = ({
  isOpen,
  token,
  planId,
  onClose,
}) => {
  const [accounts, setAccounts] = useState<AccountsModel[]>([]);
  const [serverAvailables, setServers] = useState<ServerAvailableBank[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);

  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servers = await getServersBanks(token);
        setServers(servers);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t("bank.errors.fails_to_obtain_accounts"),
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, token]);

  const handleServerChange = async (serverId: number, serverName: string) => {
    setSelectedServerId(serverId);
    setSelectedAccountId(null);
    try {
      const accountsServer = await getAccounts(token, 0, 100, serverName, "");
      setAccounts(accountsServer.accounts);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("bank.errors.fails_to_obtain_characters"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setSelectedServerId(serverId);
    }
  };

  const handleAccountChange = async (accountId: number) => {
    setSelectedAccountId(accountId);
    setSelectedCharacterId(null);
    try {
      const fetchedCharacters = await potentialClients(
        token,
        accountId,
        selectedServerId || 0
      );
      setCharacters(fetchedCharacters.characters);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("bank.errors.fails_to_obtain_characters"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setSelectedAccountId(accountId);
    }
  };

  const handleCharacterChange = (characterId: number) => {
    setSelectedCharacterId(characterId);
  };

  const handleJoinGuild = async () => {
    if (!selectedAccountId || !selectedCharacterId) {
      Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        text: t("bank.bank_characters.errors.missing_data"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    setLoading(true);

    try {
      await applyForBankLoan(
        planId,
        selectedAccountId,
        selectedCharacterId,
        selectedServerId || 0,
        token,
        user.language
      );
      Swal.fire({
        icon: "success",
        title: "¡Negocio Redondo, Socio!",
        text: t("bank.bank_characters.success-loan"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-midnight rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          {t("bank.bank_characters.title")}
        </h2>
        <p className="text-gray-400 max-w-[50rem] overflow-y-auto whitespace-normal font-mono">
          {t("bank.bank_characters.description")}
        </p>

        {serverAvailables && (
          <select
            onChange={(e) => {
              const selectedIndex = e.target.selectedIndex;
              const serverId = Number(e.target.value);
              const serverName = e.target.options[selectedIndex].text;
              handleServerChange(serverId, serverName);
            }}
            value={selectedServerId ?? ""}
            className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              {t("bank.bank_characters.select-server")}
            </option>
            {serverAvailables.map((server) => (
              <option
                key={server.id}
                value={server.id}
                className="bg-gray-800 text-gray-300"
              >
                {server.name}
              </option>
            ))}
          </select>
        )}

        {selectedServerId && (
          <select
            onChange={(e) => handleAccountChange(Number(e.target.value))}
            value={selectedAccountId ?? ""}
            className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              {t("bank.bank_characters.select-account")}
            </option>
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.account_id}
                className="bg-gray-800 text-gray-300"
              >
                {account.username}
              </option>
            ))}
          </select>
        )}

        {selectedAccountId && (
          <select
            onChange={(e) => handleCharacterChange(Number(e.target.value))}
            value={selectedCharacterId ?? ""}
            className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              {t("bank.bank_characters.select-character")}
            </option>
            {characters.map((character) => (
              <option
                className="bg-gray-800 text-gray-300"
                key={character.id}
                value={character.id}
              >
                {character.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex mt-10">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-red-900 text-white rounded mr-2 font-serif"
          >
            {t("bank.bank_characters.btn.secondary")}
          </button>
          <button
            onClick={handleJoinGuild}
            disabled={
              !selectedServerId ||
              !selectedAccountId ||
              !selectedCharacterId ||
              loading
            }
            className={`flex-1 px-4 py-2 font-serif ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800"
            } text-white rounded ml-2`}
          >
            {loading
              ? t("bank.bank_characters.btn.loading")
              : t("bank.bank_characters.btn.primary")}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BankCharacter;
