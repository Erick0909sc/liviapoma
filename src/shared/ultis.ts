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
export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://liviapoma.vercel.app/";
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

export const formatDateOfInputDate = (fecha: Date): Date => {
  // Clonar la fecha para evitar modificar la original
  const fechaPeru = new Date(fecha);
  if (process.env.NODE_ENV !== "production") {
    fechaPeru.setUTCHours(fechaPeru.getUTCHours() - 5);
  } else {
    fechaPeru.setUTCHours(fechaPeru.getUTCHours());
  }
  return fechaPeru;
};

export const formatDate = (fecha: Date): Date => {
  // Ajustar la hora a la zona horaria de Perú (UTC-5)
  fecha.setUTCHours(fecha.getUTCHours() - 5);
  return fecha;
};

export const executeAfterDate = (date: string, customFunction: () => void) => {
  const nowInPeru = formatDate(new Date());
  const fechaEspecificaDate = formatDateOfInputDate(new Date(date));
  const tiempoRestante = fechaEspecificaDate.getTime() - nowInPeru.getTime();
  if (tiempoRestante <= 0) {
    customFunction();
  } else {
    setTimeout(customFunction, tiempoRestante);
  }
};

export const formatToDatetimeLocal = (isoDate: Date) => {
  const date = new Date(isoDate);
  date.setUTCHours(date.getUTCHours());

  return date.toISOString().slice(0, 16); // El formato datetime-local es "yyyy-MM-ddThh:mm"
};

export const formatFechaISO = (fechaISO: string | Date) => {
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
  const float = (producto.quantity * producto.product.price).toFixed(2);
  return parseFloat(float);
};

export const calcularTotalCentimos = (numero: number) => {
  var resultado = numero * 100;
  resultado = Math.floor(resultado);
  return resultado;
};

export const CalcularTotalSoles = (number: number) => {
  var resultado = (number / 100).toFixed(2);
  return parseFloat(resultado);
}

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
  const descuentoTotal = descuento * producto.quantity;
  return parseFloat(descuentoTotal.toFixed(2));
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
