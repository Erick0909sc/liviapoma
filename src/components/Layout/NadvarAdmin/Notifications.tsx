import { pusher } from "@/shared/pusherInstance";
import { getNotifications } from "@/states/globalApi";
import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

type Props = {};

interface Notification {
  id: number;
  message: string;
  time: string;
  createdAt: string;
}

const Notifications = (props: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getNotifications();
      setNotifications(res.data);
    })();
  }, []);
  useEffect(() => {
    const channel = pusher.subscribe("liviapoma");
    channel.bind("liviapoma-notification", (data: Notification[]) => {
      setNotifications(data);
    });

    return () => {
      pusher.unsubscribe("liviapoma");
    };
  }, [notifications]);
  return (
    <div className="absolute top-6 right-0 z-10 bg-white w-96 p-2 rounded-lg shadow-md max-h-96 overflow-auto">
      <h2 className="text-gray-800 text-xl font-semibold mb-3">
        Notificaciones
      </h2>
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center rounded-lg p-2 ${
              notification.time === "Hace un momento"
                ? "bg-green-100 animate-fade-down"
                : "bg-slate-100 animate-fade"
            }`}
          >
            <FaBell className="text-green-500" />
            <div className="flex-1">
              <p className="text-justify text-base text-gray-800 p-1 line-clamp-3">
                {notification.message}
              </p>
              <p
                className={`text-sm font-bold ${
                  notification.time === "Hace un momento"
                    ? "text-green-500"
                    : "text-gray-600"
                }`}
              >
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
