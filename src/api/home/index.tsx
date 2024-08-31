import { BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { GuildData, GuildsDto, ProfesionsServices } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const ProfessionsServicesApi = async (
  page: number = 0,
  size: number = 10
): Promise<ProfesionsServices[]> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/characters/services?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    const responseData: GenericResponseDto<ProfesionsServices[]> =
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
