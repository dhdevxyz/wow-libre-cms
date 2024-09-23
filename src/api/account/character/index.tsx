import { BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { Characters, Friends } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getCharacters = async (
  jwt: string,
  accountId: number
): Promise<Characters> => {
  try {
    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/characters?account_id=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: uuidv4(),
        },
      }
    );
    const responseData: GenericResponseDto<Characters> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    }
    throw new Error("Ha ocurrido un error al obtener los personajes");
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ha ocurrido un error al obtener los personajes : ${error.message}`
    );
  }
};

export const getFriends = async (
  jwt: string,
  characterId: number,
  accountId: number
): Promise<Friends> => {
  console.log(characterId);
  try {
    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/social/${characterId}/friends?account_id=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: uuidv4(),
        },
      }
    );
    const responseData: GenericResponseDto<Friends> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    }
    throw new Error("Ha ocurrido un error al actualizar los datos");
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ha ocurrido un error al actualizar los datos : ${error.message}`
    );
  }
};

export const deleteFriend = async (
  jwt: String,
  characterId: number,
  friendId: number,
  accountId: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/social/${characterId}/${friendId}?account_id=${accountId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: uuidv4(),
        },
      }
    );

    if (response.ok && response.status >= 200 && response.status < 300) {
      return;
    } else if (response.status >= 400) {
      throw new Error("Error al Obtener los datos");
    }

    // Agregar un retorno por defecto en caso de otros casos no contemplados
    throw new Error("Error desconocido al obtener los datos");
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${error.message}`
    );
  }
};

export const sendMoneyByFriend = async (
  jwt: String,
  characterId: number,
  friendId: number,
  accountId: number,
  money: number
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const requestBody: {
      character_id: number;
      friend_id: number;
      account_id: number;
      money: number;
    } = {
      character_id: characterId,
      friend_id: friendId,
      account_id: accountId,
      money: money,
    };

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/social/send/money`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: transactionId,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok && response.status >= 200 && response.status < 300) {
      return;
    } else {
      const responseData = await response.json();
      const badRequestError: GenericResponseDto<void> = responseData;
      throw new Error(
        `${badRequestError.message} - TransactionId: ${transactionId}`
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};

export const sendLevelByFriend = async (
  jwt: String,
  characterId: number,
  friendId: number,
  accountId: number,
  level: number
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const requestBody: {
      character_id: number;
      friend_id: number;
      account_id: number;
      level: number;
    } = {
      character_id: characterId,
      friend_id: friendId,
      account_id: accountId,
      level: level,
    };

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/social/send/level`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: transactionId,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok && response.status >= 200 && response.status < 300) {
      return;
    } else {
      const responseData = await response.json();
      const badRequestError: GenericResponseDto<void> = responseData;
      throw new Error(
        `${badRequestError.message} - TransactionId: ${transactionId}`
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};
