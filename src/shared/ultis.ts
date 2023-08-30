import axios from "axios";
export const BASE_URL = process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://liviapoma-git-junior-juniorhuanca.vercel.app/"
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