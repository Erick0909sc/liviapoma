import Pusher from "pusher-js";
import PusherBack from "pusher";

declare global {
  var pusherInstance: Pusher | undefined;
  var pusherBackInstance: PusherBack | undefined;
}

export const pusher =
  globalThis.pusherInstance ||
  new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  });
export const pusherBack =
  globalThis.pusherBackInstance ||
  new PusherBack({
    appId: process.env.APP_ID_PUSHER as string,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    secret: process.env.SECRET_PUSHER as string,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    useTLS: true,
  });

globalThis.pusherInstance = pusher;
globalThis.pusherBackInstance = pusherBack;
