import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  FaUser,
  FaShoppingCart,
  FaEnvelope,
  FaChartBar,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();

  const items = [
    {
      name: "Perfil del Usuario",
      route: "/profile/editUser",
      icon: <FaUser className="text-2xl" />,
    },
    {
      name: "Carrito de Compras",
      route: "/cart",
      icon: <FaShoppingCart className="text-2xl" />,
    },
    {
      name: "Contactanos",
      route: "/contactanos",
      icon: <FaEnvelope className="text-2xl" />,
    },
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <FaChartBar className="text-2xl" />,
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const renderContent = () => {
    if (session?.user) {
      const isAdminOrManager = session.user.role === ("Admin" || "Manager");
      return (
        <ul className="space-y-3 text-center font-semibold">
          <li className="border-b-2 border-black">
            <h2 className="text-lg font-bold pt-1 truncate">
              {session.user.name}
            </h2>
          </li>
          {items.map((item) =>
            item.name === "Dashboard" && !isAdminOrManager ? null : (
              <Link href={item.route} key={item.name}>
                <li
                  className="flex items-center gap-2 hover:bg-green-800 p-2 hover:text-white cursor-pointer"
                  onClick={onClose}
                >
                  {item.icon} {item.name}
                </li>
              </Link>
            )
          )}
          <li
            className="flex items-center gap-2 hover:bg-green-800 p-2 hover:text-white cursor-pointer rounded-b-lg"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-2xl" /> Cerrar Sesión
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="space-y-2 text-center font-semibold">
          <li className="border-b-2 border-gray-500 text-gray-500 p-2">
            <a onClick={onClose}>SIN USUARIO</a>
          </li>
          <li
            className="flex items-center gap-2 hover:bg-green-800 p-2 hover:text-white cursor-pointer rounded-b-lg"
            onClick={() => {
              onClose();
              signIn();
            }}
          >
            <FaSignInAlt className="text-2xl" /> Iniciar Sesión
          </li>
        </ul>
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute top-16 right-1 z-50 max-w-[220px]">
      <div className="bg-white border-2 border-green-700 rounded-b-2xl p-2 text-black text-base text-center animate-flip-down animate-duration-[1.5s]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileModal;
