import { BASE_URL, BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { GuildData, GuildsDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getGuilds = async (
  page: number = 0,
  size: number = 10,
  search: string = "",
  server: string,
  expansion: string = "2"
): Promise<GuildsDto> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL}/api/guilds?size=${size}&page=${page}&search=${encodeURIComponent(
        search
      )}&server=${server}&expansion=${expansion}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    const responseData: GenericResponseDto<GuildsDto> = await response.json();

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

export const getGuild = async (
  guildId: number,
  serverId: number
): Promise<GuildData> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL}/api/guilds/${guildId}?server_id=${serverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<GuildData> = await response.json();

      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the guilds: ${error.message}`
    );
  }
};

export const attach = async (
  serverId: number,
  guildId: number,
  accountId: number,
  characterId: number,
  token: string
): Promise<void> => {
  try {
    const transactionId = uuidv4();

    const requestBody: {
      server_id: number;
      account_id: number;
      character_id: number;
      guild_id: number;
    } = {
      server_id: serverId,
      account_id: accountId,
      character_id: characterId,
      guild_id: guildId,
    };

    const response = await fetch(`${BASE_URL}/api/guilds/attach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok && response.status === 204) {
      return;
    } else {
      const responseData: GenericResponseDto<void> = await response.json();
      throw new Error(`${responseData.message}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(` ${error.message}`);
  }
};

export const getMemberDetailGuild = async (
  accountId: number,
  characterId: number,
  token: string
): Promise<GuildData> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/guilds/member/${characterId}?account_id=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<GuildData> = await response.json();

      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the guilds: ${error.message}`
    );
  }
};

export const unlinkGuild = async (
  accountId: number,
  characterId: number,
  token: string
): Promise<GenericResponseDto<void>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/guilds/member/${characterId}?account_id=${accountId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();
      return responseData;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to separate from the brotherhood: ${error.message}`
    );
  }
};

export const claimBenefits = async (
  accountId: number,
  characterId: number,
  token: string
): Promise<GenericResponseDto<void>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/guilds/claim-benefits/${characterId}?account_id=${accountId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();
      return responseData;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to separate from the brotherhood: ${error.message}`
    );
  }
};
