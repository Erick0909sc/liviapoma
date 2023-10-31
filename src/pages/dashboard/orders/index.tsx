import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import { pusher } from "@/shared/pusherInstance";
import { useEffect, useState } from "react";

type Props = {};

const Orders = (props: Props) => {
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    const channel = pusher.subscribe("liviapoma");

    channel.bind("liviapoma-notification", (data: any) => {
      console.log(data);
      setNotifications(data);
    });

    return () => {
      pusher.unsubscribe("liviapoma");
    };
  }, [notifications]);
  return (
    <LayoutAdmin title="Orders">
      <div className="bg-red-500 absolute top-0 right-0 w-96 h-96">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification: any) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      </div>
    </LayoutAdmin>
  );
};

export default Orders;
