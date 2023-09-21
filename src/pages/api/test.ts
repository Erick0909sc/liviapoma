import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cron from "node-cron";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // Definir una función para obtener un chiste aleatorio de Chuck Norris
        const getChuckNorrisJoke = async () => {
          const response = await axios.get(
            "https://api.chucknorris.io/jokes/random"
          );
          return response.data.value;
        };

        // Programar una tarea cron para ejecutar cada minuto
        cron.schedule("* * * * *", async () => {
          const joke = await getChuckNorrisJoke();
          return res.status(200).json({ joke });
        });

        // Enviar un chiste aleatorio en la respuesta inicial
        const initialJoke = await getChuckNorrisJoke();
        res.status(200).json({ joke: initialJoke });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
