import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { v4 as uuidv4 } from "uuid";

export const validateRecoverPassword = async (
  email: string,
  code: string
): Promise<GenericResponseDto<void>> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/account/recovery-password?email=${email}&code=${code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          transaction_id: uuidv4(),
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();

      return responseData;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(`${errorGeneric.message}`);
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else {
      throw new Error(`${error.message}`);
    }
  }
};

export const recoverPassword = async (
  email: string
): Promise<GenericResponseDto<void>> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/account/recovery-password?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: uuidv4(),
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();

      return responseData;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(`${errorGeneric.message}`);
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else {
      throw new Error(`${error.message}`);
    }
  }
};

export const validateMail = async (
  jwt: string,
  code: string
): Promise<GenericResponseDto<void>> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/account/confirm-email?code=${code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          transaction_id: uuidv4(),
          Authorization: "Bearer " + jwt,
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      const responseData: GenericResponseDto<void> = await response.json();
      return responseData;
    } else {
      const responseData: GenericResponseDto<void> = await response.json();
      throw new Error(`${responseData.message}`);
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else {
      throw new Error(`${error.message}`);
    }
  }
};
