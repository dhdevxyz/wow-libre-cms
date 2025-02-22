"use client";
import React from "react";

const PayUForm = () => {
  const handleCurlRequest = async () => {
    const formData = new URLSearchParams();
    formData.append("merchantId", "508029");
    formData.append("accountId", "512321");
    formData.append("description", "Test PAYU");
    formData.append("referenceCode", "TestPayU");
    formData.append("amount", "20000");
    formData.append("tax", "3193");
    formData.append("taxReturnBase", "16806");
    formData.append("currency", "COP");
    formData.append("signature", "7ee7cf808ce6a39b17481c54f2c57acc");
    formData.append("test", "0");
    formData.append("buyerEmail", "test@test.com");
    formData.append("responseUrl", "http://www.test.com/response");
    formData.append("confirmationUrl", "http://www.test.com/confirmation");

    try {
      const response = await fetch(
        "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="text-white">
      <form
        method="post"
        action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
      >
        <input type="hidden" name="merchantId" value="508029" />
        <input type="hidden" name="accountId" value="512321" />
        <input type="hidden" name="description" value="Test PAYU" />
        <input
          type="hidden"
          name="referenceCode"
          value="cP4RODUCT4xadasdasdatasd6Z2"
        />
        <input type="hidden" name="amount" value="20000" />
        <input type="hidden" name="tax" value="3193" />
        <input type="hidden" name="taxReturnBase" value="0" />
        <input type="hidden" name="currency" value="COP" />
        <input
          type="hidden"
          name="signature"
          value="0593f5f10bd2aded7b654cac3c9ad225"
        />
        <input type="hidden" name="test" value="0" />
        <input type="hidden" name="buyerEmail" value="test@test.com" />
        <input
          type="hidden"
          name="responseUrl"
          value="http://www.test.com/response"
        />
        <input
          type="hidden"
          name="confirmationUrl"
          value="https://4f1a-181-51-34-168.ngrok-free.app/transaction/api/payment/notification"
        />
        <input type="submit" value="Enviar" />
      </form>
      <button onClick={handleCurlRequest} style={{ marginTop: "10px" }}>
        Enviar con Fetch (cURL equivalente)
      </button>
    </div>
  );
};

export default PayUForm;
