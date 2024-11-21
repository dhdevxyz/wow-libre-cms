import {
  faCoins,
  faSortUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";

import {
  deleteFriend,
  sendLevelByFriend,
  sendMoneyByFriend,
} from "@/api/account/character";
import { Character } from "@/model/model";
import Swal from "sweetalert2";
import { InternalServerError } from "@/dto/generic";

interface FriendsDetailProps {
  jwt: String;
  character: Character;
  friend: Character;
  accountId: number;
  serverId: number;
  onCloseModal: () => void;
  onFriendDeleted: (friendId: number) => void;
  t: (key: string, options?: any) => string;
}

const FriendDetail: React.FC<FriendsDetailProps> = ({
  jwt,
  character,
  friend,
  accountId,
  serverId,
  onCloseModal,
  onFriendDeleted,
  t,
}) => {
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
        title: t("friend-detail-modal.messages-erros.delete-friend.title"),
        text: t("friend-detail-modal.messages-erros.delete-friend.success"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
      onFriendDeleted(friend.id);
      onCloseModal();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: t("friend-detail-modal.messages-erros.delete-friend.error"),
        text: `${error.message}`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
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
        title: "Opss!",
        text: t("friend-detail-modal.messages-erros.lvl-max"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
      return;
    } else if (giftLevels <= 0) {
      Swal.fire({
        icon: "error",
        title: "Opss!",
        text: t("friend-detail-modal.messages-erros.lvl-min"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
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
        title: t("friend-detail-modal.messages-erros.send-level.title"),
        text: t("friend-detail-modal.messages-erros.send-level.success"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      onCloseModal();
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
        title: "Opss!",
        text: t("friend-detail-modal.messages-erros.money-empty"),
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
        title: t("friend-detail-modal.messages-erros.send-money.title"),
        text: t("friend-detail-modal.messages-erros.send-money.success"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      onCloseModal();
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
          <p>
            {t("friend-detail-modal.nivel")} {friend.level}
          </p>
          <p>
            {t("friend-detail-modal.clase")} {friend.class}
          </p>
          <p>
            {t("friend-detail-modal.raza")} {friend.race}
          </p>
          <p>
            {t("friend-detail-modal.estado")} {friend.flags}
          </p>
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
          {t("friend-detail-modal.send-levels.btn-txt")}
        </button>
        <button
          className="w-full action-button bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
          onClick={openGiftMoneyOpenModal}
        >
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          {t("friend-detail-modal.send-gold.btn-txt")}
        </button>
        <button
          className="w-full action-button bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-2 px-4 rounded-lg transition-all duration-300"
          onClick={deleteFriendInput}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          {t("friend-detail-modal.delete-friend.btn-txt")}
        </button>
      </div>

      {isGiftLevelsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
            <label
              htmlFor="giftLevels"
              className="text-xl font-semibold block mb-2 text-gray-200"
            >
              {t("friend-detail-modal.send-levels.cost.title")}
              <span className="text-orange-300 font-bold">5k Gold </span>
              {t("friend-detail-modal.send-levels.cost.sub-title")}
            </label>
            <p className="text-lg text-gray-400 mb-4">
              {t("friend-detail-modal.send-levels.cost.note")}
              <span className="font-semibold text-white"> 80</span>.
              <br />
              {t("friend-detail-modal.send-levels.cost.note-overcharge")}
              <span className="font-semibold text-red-500">
                <br />
                {t("friend-detail-modal.send-levels.cost.note-overcharge-v2")}
              </span>
            </p>
            <p className="text-lg font-medium mb-2">
              {t("friend-detail-modal.send-levels.cost.question")}
            </p>

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
                {t("friend-detail-modal.send-levels.cost.btn.success")}
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
                onClick={closeGiftLevelsModal}
              >
                {t("friend-detail-modal.send-levels.cost.btn.back")}
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
              {t("friend-detail-modal.send-gold.gif-gold.title")} 1 Gold <br />
              {t("friend-detail-modal.send-gold.gif-gold.sub-title")}
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
                {t("friend-detail-modal.send-gold.gif-gold.btn.success")}
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
                onClick={closeGiftMoneyModal}
              >
                {t("friend-detail-modal.send-gold.gif-gold.btn.back")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendDetail;
