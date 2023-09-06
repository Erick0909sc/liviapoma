import axios from "axios";
import { IProductCart } from "./types";
export const BASE_URL = process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://liviapoma-git-junior-juniorhuanca.vercel.app"
// export const BASE_URL = process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://liviapoma.vercel.app"

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
}

export const processImage = (
  image: File
) => {
  const formData = new FormData();
  formData.append("image", image);
  return axios.post(`/api/v1/picture`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const calcularSubtotalItem = (producto: IProductCart): number => {
  return producto.quantity * producto.product.price;
}

export const calcularSubtotal = (items: IProductCart[]): number => {
  let subtotalTotal = 0;
  for (const producto of items) {
    subtotalTotal += calcularSubtotalItem(producto);
  }
  return subtotalTotal;
}

export const calcularDescuentoItem = (producto: IProductCart): number => {
  const precioSinDescuento = producto.product.price;
  const descuentoPorcentaje = producto.product.discount;
  const descuento = (precioSinDescuento * descuentoPorcentaje) / 100;
  return descuento * producto.quantity;
}

export const calcularDescuento = (carrito: IProductCart[]): number => {
  let descuentoTotal = 0;

  for (const producto of carrito) {
    descuentoTotal += calcularDescuentoItem(producto);
  }

  return descuentoTotal;
}