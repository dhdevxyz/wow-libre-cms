import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { PromotionsDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getPromotions = async (
  language: string,
  token: string,
  serverId: number,
  accountId: number,
  characterId: number
): Promise<PromotionsDto> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL}/api/transaction/promotions?server_id=${serverId}&character_id=${characterId}&account_id=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          "Accept-Language": language,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<PromotionsDto> =
        await response.json();

      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the professions: ${error.message}`
    );
  }
};

export const claimPromotion = async (
  serverId: number,
  accountId: number,
  characterId: number,
  promotionId: number,
  language: string,
  token: string
): Promise<GenericResponseDto<void>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL}/api/transaction/claim-promotions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          "Accept-Language": language,
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          character_id: characterId,
          promotion_id: promotionId,
          account_id: accountId,
          server_id: serverId,
        }),
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
      `It was not possible to obtain the professions: ${error.message}`
    );
  }
};
