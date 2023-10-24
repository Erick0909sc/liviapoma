import type { NextApiRequest, NextApiResponse } from "next";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";
const { HASH_IZIPAY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { clientAnswer, hash, transactions, customer } = req.body;
        console.log(req.body);
        console.log(transactions);
        console.log(customer);
        console.log(HASH_IZIPAY);
        const answerHash = Hex.stringify(
          hmacSHA256(JSON.stringify(clientAnswer), HASH_IZIPAY as string)
        );
        if (hash === answerHash) res.status(200).send("Valid payment");
        else res.status(500).send("Payment hash mismatch");
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
