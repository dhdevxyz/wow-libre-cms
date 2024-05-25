import { BASE_URL_AUTH } from "@/configs/configs";
import { BadRequestDto, GenericResponseDto } from "@/dto/generic";
import { RegisterData } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const register = async (
  userData: RegisterData
): Promise<GenericResponseDto<void> | GenericResponseDto<BadRequestDto>> => {
  const response = await fetch(`${BASE_URL_AUTH}/api/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      transaction_id: uuidv4(),
    },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  if (response.ok && response.status === 201) {
    return responseData;
  } else if (response.status == 400) {
    const badRequestError: GenericResponseDto<BadRequestDto> = responseData;
    return badRequestError;
  } else if (response.status == 409) {
    console.log("Error 409");
    return responseData;
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${errorMessage}`
    );
  }
};
