import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSortUp,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import { Character } from "@/model/model";
import {
  deleteFriend,
  sendLevelByFriend,
  sendMoneyByFriend,
} from "@/api/account/character";

interface FriendsDetailProps {
  jwt: String;
  character: Character;
  friend: Character;
  accountId: number;
  serverId: number;
  onCloseModal: () => void;
  onFriendDeleted: (friendId: number) => void;
}

const FriendDetail: React.FC<FriendsDetailProps> = ({
  jwt,
  character,
  friend,
  accountId,
  serverId,
  onCloseModal,
  onFriendDeleted,
}) => {
  if (friend == null) {
    return <p>Selecciona un personaje para mostrar detalles.</p>;
  }

  const [giftLevels, setGiftLevels] = useState(0);
  const [giftMoney, setGiftMoney] = useState(0);

  const [isGiftLevelsOpen, setIsGiftLevelsOpen] = useState(false);
  const [isGiftOroOpen, setIsMoneyIsOpen] = useState(false);

  const openGiftLevelsModal = () => {
    setIsGiftLevelsOpen(true);
  };

  const closeGiftLevelsModal = () => {
    setIsGiftLevelsOpen(false);
  };

  const openGiftMoneyOpenModal = () => {
    setIsMoneyIsOpen(true);
  };

  const deleteFriendInput = async () => {
    try {
      await deleteFriend(jwt, character.id, friend.id, accountId, serverId);
      Swal.fire({
        icon: "success",
        title: "Amigo Eliminado",
        text: "Tu amigo ha sido eliminado con éxito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      onFriendDeleted(friend.id);
      onCloseModal();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al Eliminar Amigo",
        text: `${error.message}`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
    }
  };

  const closeGiftMoneyModal = () => {
    setIsMoneyIsOpen(false);
  };

  const handleGiftLevelsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);

    setGiftLevels(value);
  };

  const handleGiftMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGiftMoney(Number(event.target.value));
  };

  const handleGiftLevelsSubmit = async () => {
    if (giftLevels > 80) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nivel no puede ser superior a 80",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    } else if (giftLevels <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nivel debe ser superior a 0",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }
    try {
      await sendLevelByFriend(
        jwt,
        character.id,
        friend.id,
        accountId,
        serverId,
        giftLevels
      );
      Swal.fire({
        icon: "success",
        title: "Nivel Regalado con exito",
        text: "",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      onCloseModal();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
      });
    }
    closeGiftLevelsModal();
  };

  const handleGiftMoneySubmit = async () => {
    if (giftMoney <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El dinero a enviar debe ser superior a 1 de oro",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }
    try {
      await sendMoneyByFriend(
        jwt,
        character.id,
        friend.id,
        accountId,
        serverId,
        giftMoney
      );
      Swal.fire({
        icon: "success",
        title: "Dinero enviado",
        text: "",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      onCloseModal();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
    closeGiftMoneyModal();
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center select-none">
        <img
          src={
            friend.race_logo
              ? friend.race_logo
              : "https://via.placeholder.com/150"
          }
          alt="Avatar del amigo"
          className="w-32 h-32 rounded-full border-4 border-neon_green shadow-lg mb-6"
        />
        <h2 className="text-2xl font-bold mb-2">{friend.name}</h2>
        <div className="text-gray-400 mb-4 flex flex-col items-center">
          <p>Nivel: {friend.level}</p>
          <p>Clase: {friend.class}</p>
          <p>Raza: {friend.race}</p>
          <p>Status: {friend.flags}</p>
          {friend.note && (
            <p className="text-gray-400 italic mb-1 overflow-hidden max-h-24">
              {friend.note}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4 items-center max-w-md mx-auto">
        <button
          className="w-full action-button bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
          onClick={openGiftLevelsModal}
        >
          <FontAwesomeIcon icon={faSortUp} className="mr-2" />
          Regalar Niveles
        </button>
        <button
          className="w-full action-button bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
          onClick={openGiftMoneyOpenModal}
        >
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          Enviar Oro
        </button>
        <button
          className="w-full action-button bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300"
          onClick={deleteFriendInput}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          Eliminar Amigo
        </button>
      </div>

      {isGiftLevelsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
            <label
              htmlFor="giftLevels"
              className="text-xl font-semibold block mb-2 text-gray-200"
            >
              Costo: <span className="text-orange-300 font-bold">5k Gold </span>
              por nivel
            </label>
            <p className="text-lg text-gray-400 mb-4">
              Recuerda: el nivel máximo es
              <span className="font-semibold text-white"> 80</span>.
              <br />
              Si envías una cantidad mayor a la permitida,
              <span className="font-semibold text-red-500">
                <br /> se te cobrará igualmente.
              </span>
            </p>
            <p className="text-lg font-medium mb-2">Cantidad de Niveles:</p>

            <input
              type="number"
              id="giftLevels"
              value={giftLevels}
              min="1"
              onChange={handleGiftLevelsChange}
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded-lg"
            />
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 mr-2"
                onClick={handleGiftLevelsSubmit}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
                onClick={closeGiftLevelsModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isGiftOroOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
            <label
              htmlFor="giftMoney"
              className="text-lg font-semibold block mb-4"
            >
              Costo: 1 Gold <br />
              Cantidad de Oro:
            </label>
            <input
              type="number"
              id="giftMoney"
              value={giftMoney}
              onChange={handleGiftMoneyChange}
              className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded-lg"
            />
            <div className="flex justify-end">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300 mr-2"
                onClick={handleGiftMoneySubmit}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
                onClick={closeGiftMoneyModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendDetail;
