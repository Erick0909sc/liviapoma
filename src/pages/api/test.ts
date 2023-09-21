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
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs/promises";
import { peruDateTimeFormat } from "@/shared/ultis";

const DATA_FILE_PATH = "./data.json";

function ejecutarDespuesDeFecha(fecha: string, funcionAEjecutar: () => void) {
  const nowInPeru = new Date().toLocaleString("en-US", {
    timeZone: "America/Lima",
  });
  const currentDate = new Date(nowInPeru);
  const fechaEspecifica = new Date(fecha).toLocaleString("en-US", {
    timeZone: "America/Lima",
  });
  const fechaEspecificaDate = new Date(fechaEspecifica);
  const tiempoRestante = fechaEspecificaDate.getTime() - currentDate.getTime();

  if (tiempoRestante <= 0) {
    // La fecha ya ha pasado, ejecuta la función inmediatamente.
    funcionAEjecutar();
  } else {

    setTimeout(funcionAEjecutar, tiempoRestante);
  }
}
const getChuckNorrisJoke = async () => {
  const response = await axios.get(
    "https://api.chucknorris.io/jokes/random"
  );
  return response.data.value;
};
const funcionAEjecutar = async () => {
  try {
    const newJoke = await getChuckNorrisJoke();

    let existingData = [];
    try {
      const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
      existingData = JSON.parse(data);
    } catch (error) {}

    existingData.push({ joke: newJoke });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingData));
  } catch (error) {
    console.error("Error al ejecutar la función:", error);
  }
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const OFFER_START_DATE = req.query.fecha as string;
        ejecutarDespuesDeFecha(OFFER_START_DATE, funcionAEjecutar);
        // const newJoke = await getChuckNorrisJoke();

        // let existingData = [];
        // try {
        //   const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        //   existingData = JSON.parse(data);
        // } catch (error) {}

        // existingData.push({ joke: newJoke });
        // await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingData));

        res.status(201).json({ joke: `se ejecutara ${OFFER_START_DATE}` });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "GET":
      try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
