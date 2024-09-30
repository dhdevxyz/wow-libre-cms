import { BASE_URL, BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { LoginData } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

interface ErrorLogin {
  error: number;
  message: string;
  message_trace: string;
}

/**
 * Intenta iniciar sesión con el nombre de usuario y la contraseña proporcionados.
 *
 * @param userName - Nombre de usuario para el inicio de sesión.
 * @param password - Contraseña asociada con el nombre de usuario.
 * @returns Promise<LoginData> - Un objeto que contiene la información del usuario al iniciar sesión correctamente.
 * @throws Error - Lanza un error si la solicitud falla o si el servidor responde con un error.
 */
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
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
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
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};
