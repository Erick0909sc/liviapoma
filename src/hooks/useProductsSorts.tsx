import { IProduct } from "@/shared/types";
import { setCurrentPage } from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import { useMemo } from "react";

const useProductsSorts = (
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

      if (name === "sortByName") {
        if (value === "asc") {
          result = [...arr].sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "desc") {
          result = [...arr].sort((a, b) => b.name.localeCompare(a.name));
        }
      }
      if (name === "sortByRating") {
        if (value === "asc") {
          result = [...arr].sort((a, b) => a.rating - b.rating);
        } else if (value === "desc") {
          result = [...arr].sort((a, b) => b.rating - a.rating);
        }
      }
      if (name === "sortByPrice") {
        if (value === "asc") {
          result = [...arr].sort((a, b) => a.price - b.price);
        } else if (value === "desc") {
          result = [...arr].sort((a, b) => b.price - a.price);
        }
      }
    }

    dispatch(setCurrentPage(1));
    return result;
  }, [arr, filters, dispatch]);

  return filteredArray;
};

export default useProductsSorts;
