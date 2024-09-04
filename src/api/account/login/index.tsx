import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { LoginData } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

interface ErrorLogin {
  error: number;
  message: string;
  message_trace: string;
}

export const login = async (
  userName: string,
  password: string
): Promise<LoginData> => {
  const requestBody: {
    username: string;
    password: string;
  } = {
    username: userName,
    password: password,
  };
  try {
    const response = await fetch(`${BASE_URL_AUTH}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: uuidv4(),
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<LoginData> = await response.json();

      return responseData.data;
    } else {
      const errorGeneric: ErrorLogin = await response.json();
      throw new Error(`${errorGeneric.message_trace}`);
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else {
      throw new Error(`${error.message}`);
    }
  }
};
