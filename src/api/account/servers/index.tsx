import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { ServerModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getServers = async (jwt: string): Promise<ServerModel[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL}/api/server`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
        transaction_id: transactionId,
      },
    });
    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      return responseData.data;
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
