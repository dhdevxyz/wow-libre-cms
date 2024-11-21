import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { Characters, Friends } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getCharacters = async (
  jwt: string,
  accountId: number,
  serverId: number
): Promise<Characters> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/characters?account_id=${accountId}&server_id=${serverId}`,
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
    throw new Error("It was not possible to obtain your characters");
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain your characters : ${error.message}`
    );
  }
};

export const getFriends = async (
  jwt: string,
  characterId: number,
  accountId: number,
  serverId: number
): Promise<Friends> => {
  console.log(characterId);
  try {
    const response = await fetch(
      `${BASE_URL}/api/characters/social/friends?account_id=${accountId}&server_id=${serverId}&character_id=${characterId}`,
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
    throw new Error("Getfriends Not success");
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

export const deleteFriend = async (
  jwt: String,
  characterId: number,
  friendId: number,
  accountId: number,
  serverId: number
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const requestBody: {
      character_id: number;
      friend_id: number;
      account_id: number;
      server_id: number;
    } = {
      character_id: characterId,
      friend_id: friendId,
      account_id: accountId,
      server_id: serverId,
    };

    const response = await fetch(`${BASE_URL}/api/characters/friend`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
        transaction_id: transactionId,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok && response.status == 200) {
      return;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof InternalServerError) {
      throw error;
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};

export const sendMoneyByFriend = async (
  jwt: String,
  characterId: number,
  friendId: number,
  accountId: number,
  serverId: number,
  money: number
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const requestBody: {
      character_id: number;
      friend_id: number;
      account_id: number;
      server_id: number;
      money: number;
    } = {
      character_id: characterId,
      friend_id: friendId,
      account_id: accountId,
      server_id: serverId,
      money: money,
    };

    const response = await fetch(
      `${BASE_URL}/api/characters/social/send/money`,
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

    if (response.ok && response.status == 200) {
      return;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof InternalServerError) {
      throw error;
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
  serverId: number,
  level: number
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const requestBody: {
      character_id: number;
      friend_id: number;
      account_id: number;
      server_id: number;
      level: number;
    } = {
      character_id: characterId,
      friend_id: friendId,
      account_id: accountId,
      server_id: serverId,
      level: level,
    };

    const response = await fetch(
      `${BASE_URL}/api/characters/social/send/level`,
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

    if (response.ok && response.status == 200) {
      return;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof InternalServerError) {
      throw error;
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};
