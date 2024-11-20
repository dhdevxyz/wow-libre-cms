import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
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
  const response = await fetch(`${BASE_URL}/api/account/new-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      transaction_id: uuidv4(),
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify({
      password: password,
      new_password: newPassword,
    }),
  });

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
