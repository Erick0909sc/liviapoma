import axios from "axios";
import { IProduct, IProductCart } from "./types";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import {
  addOneProductToCart,
  deleteOneProductToCart,
  patchOneProductToCart,
} from "@/states/cart/cartApi";
import { getCartUser } from "@/states/cart/cartSlice";

export const itemsPerPage = 5;

export const formatPrice = (price: number) => {
  return price.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
  // return price.toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });
};

export const formatFechaISO = (fechaISO: string) => {
  try {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const segundos = fecha.getSeconds().toString().padStart(2, "0");

    const fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return null;
  }
};

export const processImage = (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  return axios.post(`/api/v1/picture`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const calcularSubtotalItem = (producto: IProductCart): number => {
  return producto.quantity * producto.product.price;
};

export const calcularSubtotal = (items: IProductCart[]): number => {
  let subtotalTotal = 0;
  for (const producto of items) {
    subtotalTotal += calcularSubtotalItem(producto);
  }
  return subtotalTotal;
};

export const calcularDescuentoItemCart = (producto: IProductCart): number => {
  const precioSinDescuento = producto.product.price;
  const descuentoPorcentaje = producto.product.discount;
  const descuento = (precioSinDescuento * descuentoPorcentaje) / 100;
  return descuento * producto.quantity;
};

export const calcularPrecioConDescuento = (producto: IProduct): number => {
  const descuento = (producto.price * producto.discount) / 100;
  const precioConDescuento = producto.price - descuento;

  return precioConDescuento;
};

export const calcularDescuento = (carrito: IProductCart[]): number => {
  let descuentoTotal = 0;

  for (const producto of carrito) {
    descuentoTotal += calcularDescuentoItemCart(producto);
  }

  return descuentoTotal;
};

export const hanldeItemCart = async ({
  code,
  session,
  isProcessing,
  setIsProcessing,
}: {
  code: string;
  session: Session | null;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}) => {
  if (isProcessing) {
    return;
  }
  setIsProcessing(true);
  try {
    if (!session) {
      return toast.error("Por favor, inicie sesión para continuar.");
    }
    const response = await addOneProductToCart({
      userId: session.user.id,
      productCode: code,
    });
    if (response.status === 201) {
      toast.success("El artículo se ha añadido al carro con éxito.");
    }
  } catch (error) {
    toast.error("Ocurrió un error, por favor intente nuevamente.");
  } finally {
    setIsProcessing(false);
  }
};

export const handleItemsCart = async ({
  code,
  session,
  isProcessing,
  setIsProcessing,
  value,
  getCart,
}: {
  code: string;
  session: Session;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  value: number;
  getCart: () => void;
}) => {
  if (isProcessing) {
    return;
  }
  setIsProcessing(true);
  try {
    const response = await patchOneProductToCart({
      userId: session.user.id,
      productCode: code,
      quantity: value,
    });
    if (response.status === 200) {
      // dispatch(getCartUser(session.user.id));
      getCart();
    }
  } catch (error) {
    toast.error("Ocurrió un error, por favor intente nuevamente.");
  } finally {
    setIsProcessing(false);
  }
};

export const handleInputChange = async ({
  code,
  session,
  isProcessing,
  setIsProcessing,
  value,
  getCart,
}: {
  code: string;
  session: Session;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  value: number | null;
  getCart: () => void;
}) => {
  if (isProcessing) {
    return;
  }
  setIsProcessing(true);
  try {
    const response = await patchOneProductToCart({
      userId: session.user.id,
      productCode: code,
      quantity: value !== null ? value : 1,
    });
    if (response.status === 200) {
      // dispatch(getCartUser(session.user.id));
      getCart();
    }
  } catch (error) {
    toast.error("Ocurrió un error, por favor intente nuevamente.");
  } finally {
    setIsProcessing(false);
  }
};

export const handleDelete = async ({
  code,
  session,
  isProcessing,
  setIsProcessing,
  getCart,
}: {
  code: string;
  session: Session;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  getCart: () => void;
}) => {
  if (isProcessing) {
    return;
  }
  setIsProcessing(true);
  try {
    const response = await deleteOneProductToCart({
      userId: session.user.id,
      productCode: code,
    });
    if (response.status === 200) {
      getCart();
    }
  } catch (error) {
    toast.error("Ocurrió un error, por favor intente nuevamente.");
  } finally {
    setIsProcessing(false);
  }
};

export const dataPrueba = [
  {
    code: "0101002",
    name: "CEMENTO PACAS AZUL FORTIMAX 42.5 KG",
    description:
      "El cemento Pacasmayo en su versión azul Fortimax te brinda la solidez que necesitas para tus proyectos. Cada bolsa es un símbolo de confianza y calidad, llevando tus construcciones al siguiente nivel. Con Fortimax, cada estructura toma vida en tonos de éxito.",
    price: 33.7,
    marca: "PACASMAYO",
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/02.webp",
    rating: 3,
    discount: 10,
    categoryId: 1,
    deletedAt: null,
    category: {
      id: 1,
      name: "Cementos",
    },
  },
  {
    code: "0102003",
    name: 'VARILLA CORRUGADA 12"',
    description:
      'Las varillas corrugadas de 12" de Siderperú representan el equilibrio entre resistencia y flexibilidad. Perfectamente diseñadas para brindar soporte en diversas aplicaciones, estas varillas son un testimonio de la calidad que impulsa tus construcciones.',
    price: 34,
    marca: "SIDERPERU",
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/05.webp",
    rating: 4.5,
    discount: 50,
    categoryId: 2,
    deletedAt: null,
    category: {
      id: 2,
      name: "Varillas",
    },
  },
  {
    code: "0102004",
    name: 'VARILLA CORRUGADA 5/8"',
    description:
      'Las varillas corrugadas de 5/8" de Siderperú son un testimonio de fuerza en cada centímetro. Diseñadas para superar expectativas, estas varillas son la base en la que tus proyectos se elevan. Cada doblez refleja un compromiso con la integridad estructural.',
    price: 58.8,
    marca: "SIDERPERU",
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/06.webp",
    rating: 3.5,
    discount: 20,
    categoryId: 2,
    deletedAt: null,
    category: {
      id: 2,
      name: "Varillas",
    },
  },
  {
    code: "0102005",
    name: 'VARILLA CORRUGADA 3/4"',
    description:
      'En las varillas corrugadas de 3/4" de Siderperú, se encuentra el compromiso con la seguridad. Su diseño meticuloso asegura la resistencia necesaria para enfrentar cargas desafiantes. Cada centímetro es una prueba de que incluso en la construcción, la elegancia reside en la fuerza.',
    price: 87,
    marca: "SIDERPERU",
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/07.webp",
    rating: 4,
    discount: 5,
    categoryId: 2,
    deletedAt: null,
    category: {
      id: 2,
      name: "Varillas",
    },
  },
];
