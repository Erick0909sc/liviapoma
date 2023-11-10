import { IProduct } from "@/shared/types";
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
      return arr;
    }
    let result: IProduct[] = [];
    for (const filter of filters) {
      const { name, value } = filter;
      if (name === "filterByRange" && value) {
        const [min, max] = value.split("-").map(Number);
        if (min === 0 && max === 0) {
          return arr;
        }
        result = [...arr].filter(
          (product) => product.price >= min && product.price <= max
        );
      }
      if (name === "filterByDiscount") {
        result = [...arr].filter(
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
