import {
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiX,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";

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
  {
    name: "Orders",
    route: "/dashboard/orders",
  },
  {
    name: "Transactions",
    route: "/dashboard/transactions",
  },
];
export const sidebarItems = [
  {
    roles: ["Admin", "Manager"],
    text: "Dashboard",
    icon: <FiBarChart2 className="text-2xl" />,
  },
  {
    roles: ["Admin", "Manager"],
    text: "Interacción del Cliente",
    icon: null,
  },
  {
    roles: ["Admin", "Manager"],
    text: "Products",
    icon: <FiShoppingBag className="text-2xl" />,
  },
  {
    roles: ["Admin"],
    text: "Users",
    icon: <FiUsers className="text-2xl" />,
  },
  {
    roles: ["Admin", "Manager"],
    text: "Administración",
    icon: null,
  },
  {
    roles: ["Admin", "Manager"],
    text: "Disabled",
    icon: <FiX className="text-2xl" />,
  },
  {
    roles: ["Admin", "Manager"],
    text: "Offers",
    icon: <FiCheckCircle className="text-2xl" />,
  },
  {
    roles: ["Admin", "Manager"],
    text: "Orders",
    icon: <FaTruck className="text-2xl" />,
  },
  {
    roles: ["Admin", "Manager"],
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
  Orders: "Pedidos",
};
