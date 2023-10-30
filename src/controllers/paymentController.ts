import { paymentConf } from "@/shared/types";
import axios from "axios";

const { USERNAME_IZIPAY, PASSWORD_IZIPAY } = process.env;

export const createFormToken = async (paymentConf: paymentConf) => {
  const endpoint =
    "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment";
  const auth = Buffer.from(`${USERNAME_IZIPAY}:${PASSWORD_IZIPAY}`).toString(
    "base64"
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
  };

  try {
    const response = await axios.post(endpoint, paymentConf, { headers });
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = response.data;

    if (!responseData.answer || !responseData.answer.formToken) {
      console.log(responseData);
      throw new Error("No formToken found in the response data");
    }
    return responseData.answer.formToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTransactionApiIziPay = async (uuid: string) => {
  const endpoint = "https://api.micuentaweb.pe/api-payment/V4/Transaction/Get";
  const auth = Buffer.from(`${USERNAME_IZIPAY}:${PASSWORD_IZIPAY}`).toString(
    "base64"
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
  };

  try {
    const response = await axios.post(
      endpoint,
      {
        uuid,
      },
      { headers }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = response.data;
    if (responseData.status === "ERROR") {
      throw new Error("Transaction not found");
    }
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
