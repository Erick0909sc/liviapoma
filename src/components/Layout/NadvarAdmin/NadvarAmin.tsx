import React, { ChangeEvent, useEffect, useState } from "react";
import { ImMenu } from "react-icons/im";
import { GoBellFill } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { Session } from "next-auth";
import AdminModal from "@/components/Modals/Admin";
import { dashboardRoutes, translate } from "@/shared/utils";
import { useRouter } from "next/router";
import { selectSearch, setSearch } from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import { useSelector } from "react-redux";
import Notifications from "./Notifications";
import { pusher } from "@/shared/pusherInstance";

interface NadvarProps {
  toggleSidebar: () => void;
  session: Session;
}

const NadvarAmin: React.FC<NadvarProps> = ({ toggleSidebar, session }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);
  const [visibleSidebar, setVisibleSidebar] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const toggleSidebarVisibility = () => {
    setVisibleSidebar(!visibleSidebar);
    toggleSidebar();
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    const route = e.target.value.toLowerCase();
    if (route === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${route}`);
    }
  };
  const { pathname } = router;
  const playNotificationSound = () => {
    const audio = new Audio("/Notificación.mp3"); // Ruta al archivo de sonido de notificación
    audio.play();
  };
  useEffect(() => {
    const channel = pusher.subscribe("liviapoma");
    channel.bind("liviapoma-notification", () => {
      setNewNotification(true);
      playNotificationSound();
    });

    return () => {
      pusher.unsubscribe("liviapoma");
    };
  }, [newNotification]);
  useEffect(() => {
    const parts = pathname.split("/");
    const category = parts[parts.length - 1];
    setCategory(category.charAt(0).toUpperCase() + category.slice(1));
  }, [pathname]);
  return (
    <nav
      className={`flex items-center text-white justify-between h-16 bg-emerald-900  `}
    >
      <div className="flex items-center">
        <button onClick={toggleSidebarVisibility}>
          <ImMenu className="text-3xl" />
        </button>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex bg-transparent border-white border rounded-[10px] w-full">
          <select
            value={category}
            onChange={handleCategory}
            className="bg-transparent rounded-[10px] p-2 focus:outline-none max-w-[100px]"
          >
            {dashboardRoutes.map(({ name }, index) => (
              <option key={index} value={name} className="text-black">
                {translate[name]}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="bg-transparent rounded-[10px] p-2 focus:outline-none placeholder-white"
            placeholder="Escriba su búsqueda 🔎"
          />
        </div>
      </div>

      <div className="flex justify-end text-4xl"></div>

      <div className="justify-end gap-3 hidden sm:flex   lg:flex">
        <div
          className="text-2xl relative cursor-pointer"
          onClick={() => {
            setNewNotification(false);
            setShowNotifications(!showNotifications);
          }}
        >
          {newNotification && (
            <span className="absolute -top-1 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          )}
          <audio id="notificationSound" src="/Notificación.mp3" />
          <GoBellFill />
          {showNotifications && <Notifications />}
        </div>
        <div className="flex items-center ">
          <button className="flex gap-2 items-center" onClick={toggleModal}>
            {session && (
              <FaUserCircle
                onClick={toggleModal}
                className="lg:block sm:hidden cursor-pointer text-[28px]"
              />
            )}
            <div className="flex items-center">
              <h2>{session.user.name}</h2>
              {session && (
                <>
                  <FaUserCircle
                    onClick={toggleModal}
                    className="lg:hidden sm:hidden"
                  />
                  {showModal && (
                    <AdminModal isOpen={showModal} onClose={toggleModal} />
                  )}
                </>
              )}
              <GoTriangleDown />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NadvarAmin;
