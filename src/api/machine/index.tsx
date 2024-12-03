import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { MachineCoinsDto, MachineDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getCoints = async (
  token: string,
  serverId: number
): Promise<MachineCoinsDto> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL}/api/machine/coins?server_id=${serverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<MachineCoinsDto> =
        await response.json();
      return responseData.data;
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

export const claimMachine = async (
  serverId: number,
  accountId: number,
  characterId: number,
  token: string,
  language: string
): Promise<MachineDto> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL}/api/machine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
        "Accept-Language": language,
      },
      body: JSON.stringify({
        server_id: serverId,
        account_id: accountId,
        character_id: characterId,
      }),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<MachineDto> =
        await response.json();
      return responseData.data;
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
