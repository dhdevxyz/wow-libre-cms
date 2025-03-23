"use client";

import { getAccountAndServerId } from "@/api/account";
import { buyProduct } from "@/api/store";
import { AccountsModel, BuyRedirectDto } from "@/model/model";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface BuyProps {
  isOpen: boolean;
  reference: string;
  token: string;
  serverId: number;
  onClose: () => void;
}
const Buy: React.FC<BuyProps> = ({
  isOpen,
  token,
  reference,
  serverId,
  onClose,
}) => {
  const router = useRouter();

  const [accounts, setAccounts] = useState<AccountsModel[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAccounts = await getAccountAndServerId(token, serverId);
        setAccounts(fetchedAccounts.accounts);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, token]);

  const handleAccountChange = async (accountId: number) => {
    setSelectedAccountId(accountId);
  };

  const handleClose = () => {
    onClose();
  };

  const handleBuy = async () => {
    try {
      if (!selectedAccountId) {
        return;
      }

      const response: BuyRedirectDto = await buyProduct(
        selectedAccountId,
        serverId,
        token,
        false,
        reference
      );
      if (!response.is_payment) {
        router.push(response.redirect);
        return;
      }
      const paymentData: Record<string, string> = {
        merchantId: response.merchant_id,
        accountId: response.account_id,
        description: response.description,
        referenceCode: response.reference_code,
        amount: response.amount,
        tax: response.tax,
        taxReturnBase: response.tax_return_base,
        currency: response.currency,
        signature: response.signature,
        test: response.test,
        buyerEmail: response.buyer_email,
        responseUrl: response.response_url,
        confirmationUrl: response.confirmation_url,
      };

      const form = document.createElement("form");
      form.method = "POST";
      form.action = response.redirect;

      Object.keys(paymentData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(paymentData[key]);
        form.appendChild(input);
        form.target = "_blank";
      });

      document.body.appendChild(form);

      form.submit();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-midnight rounded-lg p-8 w-96 max-w-full overflow-auto">
        {" "}
        {/* Cambiar aquí el ancho */}
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          ¡Selecciona Tu Cuenta y Haz la Diferencia!
        </h2>
        <p className="text-gray-400 text-lg mt-5 mb-5">
          Al adquirir este producto, no solo obtendrás un premio increíble,
          ¡sino que también contribuirás a la mejora de nuestro servidor! Tu
          generosidad hace posible que sigamos creciendo y ofreciendo lo mejor
          para todos.
        </p>
        <select
          onChange={(e) => handleAccountChange(Number(e.target.value))}
          value={selectedAccountId || ""}
          className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            Seleccione una cuenta
          </option>
          {accounts.map((account) => (
            <option
              className="bg-gray-800 text-gray-300"
              key={account.id}
              value={account.account_id}
            >
              {account.username}
            </option>
          ))}
        </select>
        {/* Botones */}
        <div className="flex mt-4">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-red-900 text-white rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleBuy}
            disabled={!selectedAccountId || loading}
            className={`flex-1 px-4 py-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800"
            } text-white rounded ml-2`}
          >
            {loading ? "Cargando..." : "Donar"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Buy;
