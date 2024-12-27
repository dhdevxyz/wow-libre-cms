import { changePasswordGame } from "@/api/account/change-password";
import { AccountDetailDto } from "@/model/model";
import {
  faEdit,
  faInfoCircle,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

interface ProfileSecurityProps {
  account: AccountDetailDto;
  token: string;
  serverId: number;
  t: (key: string, options?: any) => string;
}

const DetailAccount = ({
  account,
  token,
  serverId,
  t,
}: ProfileSecurityProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordWeb, setPasswordWeb] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditOtp = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordWeb(event.target.value);
  };

  const handleEditPasswordInGame = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: t("account-character.messages.password-not-match"),
        text: t("account-character.messages.password-not-match-txt"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "warning",
        title: t("account-character.messages.password-is-empty"),
        text: t("account-character.messages.password-is-empty-txt"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "warning",
        title: t("account-character.messages.password-length-invalid"),
        text: t("account-character.messages.password-length-invalid-txt"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    const userSecurity = {
      server_id: serverId,
      new_password: password,
      password: passwordWeb,
      account_id: account.id,
    };

    try {
      await changePasswordGame(userSecurity, token);

      Swal.fire({
        icon: "success",
        title: t("account-character.messages.password-change-password-success"),
        text: t(
          "account-character.messages.password-change-password-success-txt"
        ),
        confirmButtonColor: "#3085d6",
        confirmButtonText: t(
          "account-character.messages.password-change-password-success-btn"
        ),
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("account-character.messages.error-change-password"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: t(
          "account-character.messages.password-change-password-success-btn"
        ),
      });
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="mx-auto mt-8 text-white">
      <div className="text-center mx-auto mt-8 max-w-2xl">
        <div className="text-center">
          <h2 className="font-bold text-2xl">{t("account-character.title")}</h2>
          <h3
            className={`text-xl font-semibold m-2 ${
              account.account_banned && account.account_banned.active
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {account.account_banned ? "Inhabilitada" : "Disponible"}
          </h3>

          {account.account_banned && account.account_banned.active && (
            <div className="grid grid-cols-2 gap-8 text-2xl">
              <p className="text-gray-400 m-2 font-semibold">
                {t("account-character.account-banned.blocking-date")}
                <br />
                <span className="text-lg ml-2">
                  {account.account_banned.bandate}
                </span>
              </p>
              <p className="text-gray-400 m-2 font-semibold text-md">
                {t("account-character.account-banned.unlock-date")}
                <br />
                <span className="ml-2 text-lg">
                  {account.account_banned.unbandate}
                </span>
              </p>
              <div className="col-span-2">
                <p className="text-gray-400 m-2 font-semibold text-2xl">
                  {t("account-character.account-banned.banned-by")} <br />
                  <span className="text-red-500 ml-2 text-2xl ">
                    {account.account_banned.banned_by}
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 m-2 font-semibold text-2xl ">
                  Motivo :<br />
                  <span className="text-gray-400 ml-2 text-lg break-words">
                    {account.account_banned.ban_reason.length > 60
                      ? `${account.account_banned.ban_reason.substring(
                          0,
                          60
                        )}...`
                      : account.account_banned.ban_reason}
                  </span>
                </p>
              </div>
            </div>
          )}

          {account.mute && (
            <div className="grid grid-cols-2 gap-8">
              <p className="text-gray-400 m-4 font-semibold text-xl">
                {t("account-character.account-banned.silenced-by")} <br />
                <span className="text-red-500 ml-2 text-2xl">
                  {account.mute_by}
                </span>
              </p>
              <p className="text-gray-400 m-4 font-semibold  text-2xl">
                Razón del muteo:
                <br />
                <span className="text-gray-500 m-2 text-lg">
                  {account.mute_reason}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-1 border-gray-300 my-4 mx-8" />
      <div className="text-center mx-auto mt-8 max-w-2xl">
        <h2 className="mb-5 font-bold text-xl text-gray-400">
          {t("account-character.description")}
        </h2>
      </div>
      <div className="px-8 pt-6 pb-8 mb-9 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">
              {t("account-character.form.password-web-txt")}
              <span className="text-blue-500 ml-2">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*********</span>
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  {t("account-character.btn.edit")}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <input
                    type="password"
                    placeholder={t(
                      "account-character.form.password-web-placeholder"
                    )}
                    onChange={handleEditOtp}
                    className="border rounded py-2 px-2  text-gray-700 text-xl focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <p className="text-white text-lg mt-2">
                  {t("account-character.form.password-web-disclaimer")}
                </p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block x text-xl font-bold mb-2">
              {t("account-character.form.new-password-account")}
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder={t(
                    "account-character.form.new-password-account-placeholder"
                  )}
                  onChange={handleEditPasswordInGame}
                  className="border rounded py-2 px-2 text-xl text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block  text-xl font-bold mb-2">
              {t("account-character.form.new-password-account-confirm")}
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder={t(
                    "account-character.form.new-password-account-confirm-placeholder"
                  )}
                  onChange={handleConfirmPassword}
                  className="border rounded py-2 px-2 text-xl text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              {t("account-character.btn.update")}
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-600 hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-600 "
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              {t("account-character.btn.cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailAccount;
