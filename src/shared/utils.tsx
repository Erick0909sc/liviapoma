import {
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiX,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export const dashboardRoutes = [
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Products",
    route: "/dashboard/products",
  },
  {
    name: "Users",
    route: "/dashboard/users",
  },
  {
    name: "Disabled",
    route: "/dashboard/disabled",
  },
  {
    name: "Offers",
    route: "/dashboard/offers",
  },
];
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
  {
    text: "Offers",
    icon: <FiCheckCircle className="text-2xl" />,
  },
  {
    text: "Transactions",
    icon: <FaMoneyBillTransfer className="text-2xl" />,
  },
];
export const translate: { [key: string]: string } = {
  Dashboard: "Tablero de control",
  Products: "Productos",
  Users: "Usuarios",
  Administración: "Administración",
  Disabled: "Productos Deshabilitados",
  Offers: "Ofertas",
  Transactions: "Transacciones",
};
