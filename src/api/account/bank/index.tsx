import { BASE_URL_CORE } from "@/configs/configs";
import { InternalServerError } from "@/dto/generic";
import { ServerAvailableBank } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

const defaultCountryOptions: ServerAvailableBank[] = [];
export const getServersBanks = async (
  jwt: string
): Promise<ServerAvailableBank[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_CORE}/api/bank/available/servers`,
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
      const responseData = await response.json();
      return responseData.data;
    } else {
      return defaultCountryOptions;
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
