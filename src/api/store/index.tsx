import { BASE_URL_TRANSACTION } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import {
  BuyRedirectDto,
  CategoryDetail,
  Product,
  ProductDetail,
} from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getProductOffert = async (): Promise<Product> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(`${BASE_URL_TRANSACTION}/api/products/offer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<Product> = await response.json();
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

export const getProductsDiscount = async (): Promise<Product[]> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_TRANSACTION}/api/products/discount`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<Product[]> = await response.json();
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

export const getProducts = async (): Promise<Map<String, CategoryDetail[]>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(`${BASE_URL_TRANSACTION}/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<Map<String, CategoryDetail[]>> =
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

export const getProduct = async (reference: string): Promise<ProductDetail> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_TRANSACTION}/api/products/${reference}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<ProductDetail> =
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

export const buyProduct = async (
  referenceNumber: string,
  accountId: number,
  serverId: number,
  token: string,
  isSubscription: boolean
): Promise<BuyRedirectDto> => {
  try {
    const transactionId = uuidv4();
    const requestBody: {
      is_subscription: boolean;
      server_id: number;
      account_id: number;
      reference_number: string;
    } = {
      is_subscription: isSubscription,
      server_id: serverId,
      account_id: accountId,
      reference_number: referenceNumber,
    };
    const response = await fetch(`${BASE_URL_TRANSACTION}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<BuyRedirectDto> =
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
