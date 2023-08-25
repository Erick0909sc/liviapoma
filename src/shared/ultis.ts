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