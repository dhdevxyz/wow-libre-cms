import { BASE_URL_AUTH, BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { BankPlans, Characters } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const potentialClients = async (
  jwt: string,
  accountId: number
): Promise<Characters> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/bank?account_id=${accountId}`,
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
      const responseData: GenericResponseDto<Characters> =
        await response.json();
      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(`${errorGeneric.message}`);
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

export const applyForBankLoan = async (
  planId: number,
  accountId: number,
  characterId: number,
  token: string,
  language: string
): Promise<void> => {
  const requestBody: {
    character_id: number;
    account_id: number;
    plan_id: number;
  } = {
    character_id: characterId,
    account_id: accountId,
    plan_id: planId,
  };
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CHARACTER}/api/bank`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        "Accept-Language": language,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();
      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(`${errorGeneric.message}`);
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

export const getPlans = async (language: string): Promise<BankPlans[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_AUTH}/api/resources/bank/plans?language=${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<BankPlans[]> =
        await response.json();
      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(`${errorGeneric.message}`);
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
