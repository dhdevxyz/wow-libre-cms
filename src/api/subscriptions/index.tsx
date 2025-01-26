import { BASE_URL, BASE_URL_TRANSACTION } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { FaqsSubscriptionsDto, SubscriptionBenefits } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getBenefitsPremium = async (
  language: string,
  token: string,
  serverId: number
): Promise<SubscriptionBenefits> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_TRANSACTION}/api/subscription/benefits?server_id=${serverId}`,
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
      const responseData: GenericResponseDto<SubscriptionBenefits> =
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

export const claimBenefitsPremium = async (
  serverId: number,
  accountId: number,
  characterId: number,
  benefitId: number,
  language: string,
  token: string
): Promise<GenericResponseDto<void>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_TRANSACTION}/api/subscription/claim-benefits`,
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
          benefit_id: benefitId,
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

export const getFaqsSubscription = async (
  language: string
): Promise<FaqsSubscriptionsDto[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL}/api/resources/faqs-subscriptions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          "Accept-Language": language,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<FaqsSubscriptionsDto[]> =
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
