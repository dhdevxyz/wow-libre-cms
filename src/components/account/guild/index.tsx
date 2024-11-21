import {
  claimBenefits,
  getMemberDetailGuild,
  unlinkGuild,
  update,
} from "@/api/guilds";
import EditGuildModal from "@/components/guild_edit";
import DisplayMoney from "@/components/money";
import { GuildMemberDto } from "@/model/model";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AccountGuildProps {
  serverId: number;
  characterId: number;
  token: string;
  accountId: number;
}

const AccountGuild: React.FC<AccountGuildProps> = ({
  serverId,
  characterId,
  accountId,
  token,
}) => {
  const [guildData, setGuildData] = useState<GuildMemberDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchGuildData = async () => {
      try {
        const data = await getMemberDetailGuild(
          serverId,
          accountId,
          characterId,
          token
        );
        setGuildData(data);
      } catch (error: any) {
        setGuildData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGuildData();
  }, [accountId, characterId, token, refresh]);

  const handleUnlinkGuild = async () => {
    try {
      await unlinkGuild(serverId, accountId, characterId, token);
      setGuildData(null);
      Swal.fire({
        icon: "success",
        title: "Desvinculacion",
        text: "Ha sido desvinculado exitosamente",
        color: "white",
        background: "#0B1218",
        timer: 4000,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4000,
      });
    }
  };

  const handleBenefitsGuild = async () => {
    try {
      await claimBenefits(accountId, characterId, token);
      setRefresh(true);
      Swal.fire({
        icon: "success",
        title: "Beneficios",
        text: "Reclamado los beneficios",
        color: "white",
        background: "#0B1218",
        timer: 4000,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4000,
      });
    }
  };

  const handleEditSave = async (newSettings: {
    isPublic: boolean;
    isMultifactorEnabled: boolean;
    discordLink: string;
  }) => {
    setGuildData((prev) =>
      prev ? { ...prev, public_access: newSettings.isPublic } : prev
    );
    await update(
      serverId,
      accountId,
      characterId,
      newSettings.discordLink,
      newSettings.isMultifactorEnabled,
      newSettings.isPublic,
      token
    );
    Swal.fire({
      icon: "success",
      title: "Configuración guardada",
      text: "Los cambios han sido guardados exitosamente",
      color: "white",
      background: "#0B1218",
      timer: 3000,
    });
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="text-white">
      <div className="contenedor mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {guildData ? (
            <div className="flex flex-col items-center">
              <div className="text-center  max-w-2xl w-full">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                  {guildData.name}
                </h2>
                <p className="text-lg max-w-full text-gray-300 overflow-wrap break-word">
                  {guildData.info}
                </p>
                <div className="text-2xl mb-4 text-white sm:text-1xl">
                  <div className="flex justify-center">
                    <DisplayMoney money={guildData.bank_money} />
                  </div>
                </div>
                <div className="text-left w-full">
                  <p className="text-lg lg:text-2xl mb-10 text-center text-yellow-300  pt-4 break-words max-w-full overflow-wrap">
                    {guildData.motd}
                  </p>
                  <p className="text-lg lg:text-2xl mb-4 break-words max-w-full overflow-wrap">
                    Leader: {guildData.leader_name}
                  </p>

                  <p className="text-lg lg:text-2xl mb-4 break-words max-w-full overflow-wrap">
                    Creada:{" "}
                    {new Date(guildData.create_date).toLocaleDateString()}
                  </p>
                  <p className="text-lg lg:text-2xl mb-4 break-words max-w-full overflow-wrap">
                    <a
                      href={`https://${guildData.discord}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-blue-400 transition duration-300"
                    >
                      <i className="fab fa-discord text-lg"></i>
                      Unirse al servidor de Discord
                    </a>
                  </p>

                  <div className="text-lg lg:text-2xl mb-4 break-words flex items-center max-w-full overflow-wrap">
                    <span>Estado de Acceso:</span>{" "}
                    <div className="ml-4 flex items-center">
                      <div
                        className={`h-5 w-5 rounded-full ${
                          guildData.public_access
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`ml-2 ${
                          guildData.public_access
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {guildData.public_access
                          ? "Acceso Público"
                          : "Acceso Privado"}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg lg:text-2xl mb-10 break-words max-w-full overflow-wrap">
                    Beneficios Disponibles: {guildData.available_benefits}
                  </p>
                </div>
              </div>

              <div className="flex flex-row text-center">
                {guildData.is_leader ? (
                  <EditGuildModal
                    isPublic={guildData.public_access}
                    isMultifactorEnabled={guildData.multi_faction}
                    discordLink={guildData.discord}
                    onSave={handleEditSave}
                  />
                ) : null}
                {guildData.available_benefits > 0 && (
                  <button
                    className="px-6 py-3 bg-green-400 hover:bg-green-600 rounded-lg text-white font-semibold mb-4 mr-2"
                    onClick={handleBenefitsGuild}
                  >
                    Reclamar beneficios
                  </button>
                )}

                <button
                  className="px-6 py-3 bg-red-400 hover:bg-red-600 rounded-lg text-white font-semibold mb-4  "
                  onClick={handleUnlinkGuild}
                >
                  Abandonar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 lg:h-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                No estás vinculado a ninguna guild
              </h2>
              <p className="text-lg mb-6 text-center">
                Parece que aún no eres miembro de ninguna guild. ¡Únete a una
                para empezar a disfrutar de los beneficios!
              </p>
              <div>
                <Link
                  href="/guild"
                  className="px-6 py-3 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                >
                  Buscar
                </Link>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 lg:gap-8">
            <div className="relative h-80 lg:h-auto select-none">
              <img
                src="https://cdn.mos.cms.futurecdn.net/PRaST9aV37L6oNFWzRtPi9-1200-80.jpg"
                alt="Envíos"
                className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75 "
              />
            </div>
            <div className="relative h-80 lg:h-auto select-none">
              <img
                src="https://preview.redd.it/bi7i6h79gzz81.jpg?auto=webp&s=ea927f5299719218b6af8d3d4b1d446140d0571d"
                alt="Disney"
                className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountGuild;
