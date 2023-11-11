import { IProduct } from "@/shared/types";
import { calcularPrecioConDescuento } from "@/shared/ultis";
import { setCurrentPage } from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import { useMemo } from "react";

const useProductsWithFilters = (
  arr: IProduct[],
  filters: { name: string; value: string }[]
) => {
  const dispatch = useAppDispatch();
  const filteredArray = useMemo(() => {
    if (!filters || filters.length === 0) {
      dispatch(setCurrentPage(1));
      return arr;
    }

    let result: IProduct[] = [...arr];

    for (const filter of filters) {
      const { name, value } = filter;

      if (name === "filterByRange" && value) {
        const [min, max] = value.split("-").map(Number);
        if (min === 0 && max === 0) {
          continue; // No aplicar el filtro si los valores son 0-0
        }
        result = result.filter(
          (product) =>
            calcularPrecioConDescuento(product) >= min &&
            calcularPrecioConDescuento(product) <= max
        );
      }

      if (name === "filterByDiscount") {
        result = result.filter(
          (product) => product.discount > 0 && product.discount <= 100
        );
      }
    }

    dispatch(setCurrentPage(1));
    return result;
  }, [arr, filters, dispatch]);

  return filteredArray;
};

export default useProductsWithFilters;
