import { BASE_URL } from "@/configs/configs";
import { UserModel } from "@/context/UserContext";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { AccountDetailDto, AccountsDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

/**
 * ES:Obtiene todas las cuentas asociadas con el cliente.
 * @param jwt - El token JWT para autorización.
 * @returns Una promesa que resuelve con un array de modelos de cuentas.
 * @throws Error - Lanza un error si la solicitud falla o si los datos son inválidos.
 */
export const getAccounts = async (
  jwt: string,
  page: number = 0,
  size: number = 10,
  server: string | null,
  username: string | null
): Promise<AccountsDto> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL}/api/account/game/available?size=${size}&page=${page}&username=${username}&server=${server}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      return responseData.data;
    } else if (response.status === 401 || response.status === 403) {
      throw new InternalServerError(
        `Token expiration`,
        response.status,
        transactionId
      );
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        genericResponse.code,
        genericResponse.transaction_id
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

export const getAccountAndServerId = async (
  jwt: string,
  serverId: number
): Promise<AccountsDto> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL}/api/account/game?server_id=${serverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      return responseData.data;
    } else if (response.status === 401 || response.status === 403) {
      throw new InternalServerError(
        `Token expiration`,
        response.status,
        transactionId
      );
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        genericResponse.code,
        genericResponse.transaction_id
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

export const getAccount = async (
  jwt: string,
  account_id: number,
  server_id: number
): Promise<AccountDetailDto> => {
  const response = await fetch(
    `${BASE_URL}/api/account/game/${account_id}/${server_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
        transaction_id: uuidv4(),
      },
    }
  );

  const responseData = await response.json();

  if (response.ok && response.status === 200) {
    return responseData.data;
  } else if (response.status == 404 || response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};

export const getUser = async (jwt: string): Promise<UserModel> => {
  const response = await fetch(`${BASE_URL}/api/account`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
      transaction_id: uuidv4(),
    },
  });

  const responseData = await response.json();

  if (response.ok && response.status === 200) {
    return responseData.data;
  } else if (response.status == 404 || response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};

export const sendMail = async (
  jwt: string
): Promise<GenericResponseDto<void>> => {
  const response = await fetch(`${BASE_URL}/api/account/send-mail`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
      transaction_id: uuidv4(),
    },
  });

  const responseData = await response.json();

  if (response.ok && response.status === 200) {
    return responseData;
  } else if (response.status == 404 || response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};
