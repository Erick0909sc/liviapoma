import { pusher } from "@/shared/pusherInstance";
import { getNotifications } from "@/states/globalApi";
import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { MdNotificationsOff } from "react-icons/md";

type Props = {};

interface Notification {
  id: number;
  message: string;
  time: string;
  createdAt: string;
}

enum states {
  Idle = "Idle",
  Pending = "Pending",
  Failed = "Failed",
  Sucess = "Sucess",
}

const Notifications = (props: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [status, setStatus] = useState(states.Idle);
  const [count, setCount] = useState(20);
  const handlerGetNotifications = async () => {
    try {
      setStatus(states.Pending);
      const res = await getNotifications(count);
      setNotifications(res.data);
      return setStatus(states.Sucess);
    } catch (error) {
      setStatus(states.Failed);
    } finally {
      setStatus(states.Sucess);
    }
  };
  useEffect(() => {
    handlerGetNotifications();
  }, [count]);
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
    <div className="absolute top-6 right-0 z-10 bg-white w-96 h-96 p-2 rounded-lg shadow-md overflow-auto">
      <h2 className="text-gray-800 text-center text-xl font-semibold mb-3">
        Notificaciones
      </h2>
      {status === states.Sucess && (
        <div className="flex flex-col justify-center">
          {!notifications.length && (
            <div className="flex flex-col items-center text-black">
              <MdNotificationsOff className="text-9xl text-gray-500" />
              <p className="text-xl text-gray-500">No hay notificaciones</p>
            </div>
          )}
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
          {notifications.length > 0 && (
            <button
              type="button"
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mt-2"
              onClick={() => {
                setCount((prevCount) => prevCount + 20);
              }}
            >
              Ver más
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
