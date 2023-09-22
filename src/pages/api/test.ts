// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import cron from "node-cron";

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;

//   switch (method) {
//     case "POST":
//       try {
//         // Definir una función para obtener un chiste aleatorio de Chuck Norris
//         const getChuckNorrisJoke = async () => {
//           const response = await axios.get(
//             "https://api.chucknorris.io/jokes/random"
//           );
//           return response.data.value;
//         };

//         // Programar una tarea cron para ejecutar cada minuto
//         cron.schedule("* * * * *", async () => {
//           const joke = await getChuckNorrisJoke();
//           console.log(
//             "************************************************************************************"
//           );
//           console.log(joke);
//           console.log(
//             "************************************************************************************"
//           );
//           return res.status(200).json({ joke });
//         });

//         // Enviar un chiste aleatorio en la respuesta inicial
//         const initialJoke = await getChuckNorrisJoke();
//         res.status(201).json({ joke: initialJoke });
//       } catch (error) {
//         res.status(500).json(error);
//       }
//       break;
//     default:
//       res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
//       break;
//   }
// }
import {
  formatDate,
  formatDateOfInputDate,
  formatFechaISO,
} from "@/shared/ultis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const OFFER_START_DATE = req.query.fecha as string;

        res.status(201).json({ joke: `se ejecutara ${OFFER_START_DATE}` });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "GET":
      try {
        res.status(200).json({
          ahora: formatDate(new Date()),
          ahoraA: formatDate(new Date()),
          startDate: formatDateOfInputDate(new Date("2023-09-22T12:07")),
          EndDate: formatDateOfInputDate(new Date("2023-09-22T12:15")),
          ahoraIso: formatFechaISO(new Date()),
          startDateIso: formatFechaISO(new Date("2023-09-22T12:07")),
          EndDateIso: formatFechaISO(new Date("2023-09-22T12:15")),
        });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
