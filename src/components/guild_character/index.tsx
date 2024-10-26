"use client";
import { getAccountAndServerId, getAccounts } from "@/api/account";
import { getCharacters } from "@/api/account/character";
import { attach } from "@/api/guilds";
import { AccountsModel, Character } from "@/model/model";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface GuildCharacterProps {
  isOpen: boolean;
  token: string;
  guildId: number;
  serverId: number;
  onClose: () => void;
}

const GuildCharacter: React.FC<GuildCharacterProps> = ({
  isOpen,
  token,
  guildId,
  serverId,
  onClose,
}) => {
  const [accounts, setAccounts] = useState<AccountsModel[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAccounts = await getAccountAndServerId(token, serverId);
        setAccounts(fetchedAccounts.accounts);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
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

  const handleAccountChange = async (accountId: number) => {
    setSelectedAccountId(accountId);
    setSelectedCharacterId(null);

    try {
      const fetchedCharacters = await getCharacters(token, accountId, serverId);
      setCharacters(fetchedCharacters.characters);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("guild-detail.errors.failed-characters-fetch"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      onClose();
    }
  };

  const handleCharacterChange = async (characterId: number) => {
    setSelectedCharacterId(characterId);
  };

  const handleJoinGuild = async () => {
    if (!selectedAccountId || !selectedCharacterId) {
      return;
    }

    setLoading(true);

    try {
      await attach(
        serverId,
        guildId,
        selectedAccountId,
        selectedCharacterId,
        token
      );
      Swal.fire({
        icon: "success",
        title: "Guild Success",
        text: t("guild-characters.message-success-guild-attach"),
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
          {t("guild-characters.title")}
        </h2>
        <p className=" text-gray-400">{t("guild-characters.description")}</p>

        <select
          onChange={(e) => handleAccountChange(Number(e.target.value))}
          value={selectedAccountId || ""}
          className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            {t("guild-characters.select-account-txt")}
          </option>
          {accounts.map((account) => (
            <option
              className="bg-gray-800 text-gray-300"
              key={account.id}
              value={account.account_id}
            >
              {account.username}
            </option>
          ))}
        </select>

        {/* Selector de personajes */}
        {selectedAccountId && (
          <select
            onChange={(e) => handleCharacterChange(Number(e.target.value))}
            value={selectedCharacterId || ""}
            className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              {t("guild-characters.select-characters-txt")}
            </option>
            {characters.map((character) => (
              <option
                className="bg-gray-800 text-gray-500"
                key={character.id}
                value={character.id}
              >
                {character.name}
              </option>
            ))}
          </select>
        )}

        {/* Botones */}
        <div className="flex mt-4">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-red-900 text-white rounded mr-2"
          >
            {t("guild-characters.btn.cancel")}
          </button>
          <button
            onClick={handleJoinGuild}
            disabled={!selectedAccountId || !selectedCharacterId || loading}
            className={`flex-1 px-4 py-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800"
            } text-white rounded ml-2`}
          >
            {loading
              ? t("guild-characters.btn.loading")
              : t("guild-characters.btn.primary")}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default GuildCharacter;
