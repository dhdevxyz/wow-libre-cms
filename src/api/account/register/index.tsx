import { BASE_URL } from "@/configs/configs";
import {
  BadRequestDto,
  GenericResponseDto,
  InternalServerError,
} from "@/dto/generic";
import {
  AccountGameRequestDto,
  AccountWebRequestDto,
  LoginData,
} from "@/model/model";
import { error } from "console";
import { v4 as uuidv4 } from "uuid";

export const registerAccountGame = async (
  userData: AccountGameRequestDto,
  jwt: string
): Promise<void> => {
  const transactionId = uuidv4();
  try {
    const response = await fetch(`${BASE_URL}/api/account/game/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(userData),
    });

    if (response.ok && response.status === 201) {
      const responseData = await response.json();
      return responseData;
    } else if (response.status == 409) {
      const badRequestError: GenericResponseDto<void> = await response.json();
      throw new Error(`${badRequestError.message}`);
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      console.log(errorGeneric);
      throw new Error(
        `${errorGeneric.message} - TransactionId: ${transactionId}`
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

export const registerAccountWeb = async (
  userData: AccountWebRequestDto,
  language: string
): Promise<LoginData> => {
  const transactionId = uuidv4();
  try {
    const response = await fetch(`${BASE_URL}/api/account/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        "Accept-Language": language,
      },
      body: JSON.stringify(userData),
    });

    if (response.ok && response.status === 201) {
      const responseData = await response.json();

      return responseData.data;
    } else if (response.status == 400) {
      throw new Error(
        `Please contact support, it seems the fields are invalid - TransactionId: ${transactionId}`
      );
    } else {
      const badRequestError: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${badRequestError.message}`,
        badRequestError.code,
        badRequestError.transaction_id
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
