import { GenericResponseDto } from "@/dto/generic";
import { AccountDetail } from "@/model/model";

export const getAccountDetail = async (jwt: string): Promise<AccountDetail> => {
  try {
    const response = await fetch("http://localhost:8080/api/account/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const responseData: GenericResponseDto<AccountDetail> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else if (response.status >= 400) {
      throw new Error("Error al Obtener los datos");
    }

    // Agregar un retorno por defecto en caso de otros casos no contemplados
    throw new Error("Error desconocido al obtener los datos");
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(
      `Ocurrió un error al intentar registrar los datos: ${error.message}`
    );
  }
};
