import axios from "axios";
import { IProductCart } from "./types";
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

export const calcularDescuentoItem = (producto: IProductCart): number => {
  const precioSinDescuento = producto.product.price;
  const descuentoPorcentaje = producto.product.discount;
  const descuento = (precioSinDescuento * descuentoPorcentaje) / 100;
  return descuento * producto.quantity;
};

export const calcularDescuento = (carrito: IProductCart[]): number => {
  let descuentoTotal = 0;

  for (const producto of carrito) {
    descuentoTotal += calcularDescuentoItem(producto);
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
