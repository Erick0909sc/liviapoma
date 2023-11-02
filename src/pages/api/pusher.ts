import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { pusherBack } from "@/shared/pusherInstance";

interface Notificacion {
  id: number;
  message: string;
  time: string;
  createdAt: Date;
}

const actualizarTiempo = async (notificacion: Notificacion) => {
  const fechaCreacion = new Date(notificacion.createdAt);
  const fechaActual = new Date();

  const diferenciaTiempo = fechaActual.getTime() - fechaCreacion.getTime();
  const segundos = Math.floor(diferenciaTiempo / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  if (dias > 0) {
    notificacion.time = fechaCreacion.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (horas > 0) {
    notificacion.time = `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
  } else if (minutos > 1) {
    notificacion.time = `Hace ${minutos} minutos`;
  } else {
    notificacion.time = "Hace un momento";
  }

  await prisma.notification.update({
    where: { id: notificacion.id },
    data: {
      time: notificacion.time,
    },
  });

  return notificacion;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { count } = req.query;
        const notifications = await prisma.notification.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: parseInt(count as string) || 20,
        });
        notifications.map(actualizarTiempo);
        res.status(200).json(notifications);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const { message } = req.body;
        const notification = await prisma.notification.create({
          data: {
            message,
          },
        });
        const notifications = await prisma.notification.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        });
        await pusherBack.trigger(
          "liviapoma",
          "liviapoma-notification",
          notifications
        );
        res.status(200).json(notification);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
