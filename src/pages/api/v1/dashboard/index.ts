import type { NextApiRequest, NextApiResponse } from "next";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";
import prisma from "@/lib/prismadb";
import { CategoryData } from "@/shared/types";
import { categoryData } from "@/shared/test";
import { formatDate } from "@/shared/ultis";
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
        const categoryData = await prisma.categoryData.findMany({
          include: { category: true },
        });
        const categories: Record<string, CategoryData> = {};
        categoryData.forEach((item) => {
          const category = item.category;
          if (!categories[category.name]) {
            categories[category.name] = {
              name: category.name,
              data: [],
            };
          }
          categories[category.name].data.push(item);
        });
        const categoriesArray = Object.values(categories);
        categoriesArray.forEach((category) => {
          category.sumValue = category.data.reduce(
            (sum, item) => sum + item.value,
            0
          );
        });
        categoriesArray.sort((a, b) => (b.sumValue || 0) - (a.sumValue || 0));
        const top5Categories = categoriesArray.slice(0, 5);
        const category1 = top5Categories[0];
        const category2 = top5Categories[1];
        const category3 = top5Categories[2];
        const category4 = top5Categories[3];
        const category5 = top5Categories[4];
        const dayData = await prisma.dailyData.findMany();
        // const dayData = [
        //   {
        //     id: 1,
        //     time: "2023-10-27",
        //     value: 4000.1,
        //   },
        //   {
        //     id: 2,
        //     time: "2023-10-28",
        //     value: 584.1,
        //   },
        //   {
        //     id: 1,
        //     time: "2023-10-29",
        //     value: 154.1,
        //   },
        //   {
        //     id: 1,
        //     time: "2023-10-30",
        //     value: 158.1,
        //   },
        //   {
        //     id: 1,
        //     time: "2023-10-31",
        //     value: 8000.1,
        //   },
        //   {
        //     id: 1,
        //     time: "2023-11-01",
        //     value: 84.1,
        //   },
        //   {
        //     id: 1,
        //     time: "2023-11-02",
        //     value: 14.1,
        //   },
        // ];
        const monthData = groupDataByMonth(dayData);
        const yearData = groupDataByYear(dayData);
        monthData.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        // Obtiene el valor del último mes
        const lastMonth = monthData[monthData.length - 1].value;
        // Obtiene el valor del penúltimo mes
        const penultimateMonth =
          monthData[monthData.length - 2]?.value || lastMonth;
        // Calcula el ingreso total desde el último mes
        const totalRevenue = lastMonth.toFixed(2);
        // Calcula el porcentaje de cambio en las ventas desde el último mes
        const percentageChange = (
          ((lastMonth - penultimateMonth) / penultimateMonth) *
          100
        ).toFixed(2);
        // Obtén la fecha actual
        const currentDate = formatDate(new Date());

        // Calcula la fecha de inicio del mes actual
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        // Calcula la fecha de inicio del mes siguiente
        const firstDayOfNextMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1
        );
        const numberOfTransactions = await prisma.order.count({
          where: {
            orderStatus: "PAID",
            createdAt: {
              gte: firstDayOfMonth,
              lt: firstDayOfNextMonth,
            },
          },
        });
        const numberOfUsers = await prisma.user.count();
        return res.status(200).json({
          dayData,
          monthData,
          yearData,
          category1,
          category2,
          category3,
          category4,
          category5,
          summary: {
            totalRevenue,
            percentageChange,
            numberOfTransactions,
            numberOfUsers,
          },
        });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const { "kr-answer": clientAnswer, "kr-hash": hash } = req.body;
        const jsonObject = JSON.parse(clientAnswer);
        const { serverDate, orderDetails, customer } = jsonObject;
        const dateUTC = new Date(serverDate);
        dateUTC.setUTCHours(dateUTC.getUTCHours() - 5);
        const datePeru = dateUTC.toISOString();
        const answerHash = Hex.stringify(
          hmacSHA256(clientAnswer, PASSWORD_IZIPAY as string)
        );
        if (hash === answerHash) {
          const time: string = datePeru.split("T")[0];
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
          const order = await prisma.order.findUnique({
            where: {
              id: parseInt(orderDetails.orderId as string),
            },
            include: {
              products: {
                include: {
                  product: {
                    include: {
                      category: true,
                      brand: true,
                      unitOfMeasure: true,
                    },
                  },
                },
              },
            },
          });
          console.log(order);
          if (!order) return;
          const partesFecha = time.split("-");
          const fechaObj = {
            year: parseInt(partesFecha[0]),
            month: parseInt(partesFecha[1]),
            day: parseInt(partesFecha[2]),
          };
          for (const item of order.products) {
            const {
              quantity,
              product: { price, categoryId },
            } = item;
            const value = quantity * price;
            await prisma.categoryData.upsert({
              where: {
                time_categoryId: {
                  time: fechaObj,
                  categoryId,
                },
              },
              update: {
                value: {
                  increment: value,
                },
              },
              create: {
                time: fechaObj,
                value,
                categoryId,
              },
            });
          }
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
