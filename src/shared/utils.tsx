import {
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiX,
  FiBarChart2,
} from "react-icons/fi";
export const sidebarItems = [
  {
    text: "Dashboard",
    icon: <FiBarChart2 className="text-2xl" />,
  },
  {
    text: "Interacción del Cliente",
    icon: null,
  },
  {
    text: "Products",
    icon: <FiShoppingBag className="text-2xl" />,
  },
  {
    text: "Users",
    icon: <FiUsers className="text-2xl" />,
  },
  {
    text: "Administración",
    icon: null,
    // icon: <FiSettings className="text-2xl" />,
  },
  {
    text: "Disabled",
    icon: <FiX className="text-2xl" />,
  },
];
export const translate: { [key: string]: string } = {
  Dashboard: "Tablero de control",
  Products: "Productos",
  Users: "Usuarios",
  Administración: "Administración",
  Disabled: "Productos Deshabilitados",
};
