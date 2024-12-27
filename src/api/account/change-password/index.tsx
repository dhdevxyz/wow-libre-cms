import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { AccountChangePasswordGameDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const changePasswordGame = async (
  userData: AccountChangePasswordGameDto,
  jwt: string
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/api/characters/account/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        transaction_id: uuidv4(),
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(userData),
    }
  );

  const responseData = await response.json();
  if (response.ok && response.status === 200) {
    return responseData;
  } else if (response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(`Error: ${errorMessage}`);
  }
};

export const changePasswordUser = async (
  password: string,
  newPassword: string,
  jwt: string
): Promise<void> => {
  const transactionId = uuidv4();
  try {
    const response = await fetch(
      `${BASE_URL}/api/account/user-password/change`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          password: password,
          new_password: newPassword,
        }),
      }
    );

    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      return responseData;
    } else if (response.status == 401) {
      throw new InternalServerError(
        `Token expiration`,
        response.status,
        transactionId
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
