import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { ConfigsResponse } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getConfigs = async (
  url: string,
  serverId: number,
  token: string
): Promise<ConfigsResponse> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL}/api/dashboard/configs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        server_id: serverId,
        route: url,
      }),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<ConfigsResponse> =
        await response.json();
      return responseData.data;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
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
