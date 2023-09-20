import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import cron from "node-cron";
import { peruDateTimeFormat } from "@/shared/ultis";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const startDate = "2023-09-20T12:18";
        cron.schedule(peruDateTimeFormat(startDate), async () => {
          // 'Esta tarea se ejecuta a las 11:26 el 20 de septiembre de 2023  en Perú (PET)'
          console.log(
            `Las ofertas estaran activas desde las ${peruDateTimeFormat(
              startDate,
              "H:mm"
            )} el ${peruDateTimeFormat(
              startDate,
              "D [de] MMMM [de] YYYY"
            )} hasta las ${peruDateTimeFormat(
              startDate,
              "H:mm"
            )} del ${peruDateTimeFormat(startDate, "D [de] MMMM [de] YYYY")}`
          );
        });
        res.status(200).json({ message: "cron.schedule" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
