import { pusherBack } from "@/shared/pusherInstance";
import prisma from "@/lib/prismadb";

export const postNotification = async (message: string, orderId: number) => {
  await prisma.notification.create({
    data: {
      message,
      orderId,
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
};

export const updateOrdersForAdmins = async () => {
  await pusherBack.trigger("liviapoma-orders", "update-orders", "message");
};
