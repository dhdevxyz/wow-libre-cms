import { GenericResponseDto } from "@/dto/generic";
import { CategoryDetail, ProductDetail } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getProducts = async (): Promise<Map<String, CategoryDetail[]>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(`http://localhost:8091/api/products`, {
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
      `http://localhost:8091/api/products/${reference}`,
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
