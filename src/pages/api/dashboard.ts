import type { NextApiRequest, NextApiResponse } from "next";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";
import prisma from "@/lib/prismadb";
const { PASSWORD_IZIPAY } = process.env;

function groupDataByMonth(
  dat: {
    time: string;
    value: number;
  }[]
) {
  if (dat.length === 0) {
    return [];
  }

  const result: { [key: string]: { time: string; value: number } } = {};

  dat.forEach((item) => {
    const [year, month] = item.time.split("-");
    const monthKey = `${year}-${month.padStart(2, "0")}-01`;

    if (result[monthKey]) {
      result[monthKey].value = parseFloat(
        (result[monthKey].value + item.value).toFixed(2)
      );
    } else {
      result[monthKey] = {
        time: monthKey,
        value: parseFloat(item.value.toFixed(2)),
      };
    }
  });

  return Object.values(result);
}

function groupDataByYear(
  dat: {
    time: string;
    value: number;
  }[]
) {
  if (dat.length === 0) {
    return [];
  }

  const result: { [key: string]: { time: string; value: number } } = {};

  dat.forEach((item) => {
    const parts = item.time.split("-");
    const year = parseInt(parts[0], 10);
    const yearKey = `${year}-01-01`;

    if (result[yearKey]) {
      result[yearKey].value = parseFloat(
        (result[yearKey].value + item.value).toFixed(2)
      );
    } else {
      result[yearKey] = {
        time: yearKey,
        value: parseFloat(item.value.toFixed(2)),
      };
    }
  });

  return Object.values(result);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        // const dayData = await prisma.dailyData.findMany();
        const dayData = [
          {
            id: 1,
            time: "2023-10-27",
            value: 1584.1,
          },
          {
            id: 2,
            time: "2023-10-28",
            value: 584.1,
          },
          {
            id: 1,
            time: "2023-10-29",
            value: 154.1,
          },
          {
            id: 1,
            time: "2023-10-30",
            value: 158.1,
          },
          {
            id: 1,
            time: "2023-10-31",
            value: 19.1,
          },
          {
            id: 1,
            time: "2023-11-01",
            value: 84.1,
          },
          {
            id: 1,
            time: "2023-11-02",
            value: 14.1,
          },
        ];
        const monthData = groupDataByMonth(dayData);
        const yearData = groupDataByYear(dayData);
        return res.status(200).json({ dayData, monthData, yearData });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const { "kr-answer": clientAnswer, "kr-hash": hash } = req.body;
        const jsonObject = JSON.parse(clientAnswer);
        const { serverDate, orderDetails } = jsonObject;
        const answerHash = Hex.stringify(
          hmacSHA256(clientAnswer, PASSWORD_IZIPAY as string)
        );
        if (hash === answerHash) {
          const time: string = serverDate.split("T")[0];
          const value: number = orderDetails.orderTotalAmount / 100;
          const result = await prisma.dailyData.upsert({
            where: {
              time,
            },
            update: {
              value: {
                increment: value,
              },
            },
            create: {
              time,
              value: value,
            },
          });
          return res.status(200).json(result);
        } else return res.status(500).send("Payment hash mismatch");
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
