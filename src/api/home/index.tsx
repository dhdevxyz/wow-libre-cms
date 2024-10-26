import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { ServersPromos } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const serversPromotions = async (
  language: string
): Promise<ServersPromos[]> => {
  try {
    const transactionId = uuidv4();
    console.log(language);
    const response = await fetch(`${BASE_URL}/api/resources/server-promos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        "Accept-Language": language,
      },
    });

    const responseData: GenericResponseDto<ServersPromos[]> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(
      `It was not possible to obtain the guilds: ${error.message}`
    );
  }
};
