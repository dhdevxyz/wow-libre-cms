import { BASE_URL, BASE_URL_CHARACTER } from "@/configs/configs";
import { MailsDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getMails = async (
  jwt: string,
  characterId: number,
  accountId: number,
  serverId: number
): Promise<MailsDto> => {
  const response = await fetch(
    `${BASE_URL}/api/characters/mails?character_id=${characterId}&account_id=${accountId}&server_id=${serverId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: uuidv4(),
        Authorization: "Bearer " + jwt,
      },
    }
  );

  const responseData = await response.json();
  if (response.ok && response.status === 200) {
    return responseData.data;
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};
