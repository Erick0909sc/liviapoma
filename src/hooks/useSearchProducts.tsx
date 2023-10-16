import { IProduct } from "@/shared/types";
import { useMemo } from "react";
import { useAppDispatch } from "@/states/store";
import { setCurrentPage } from "@/states/globalSlice";
const useSearchProducts = (arr: IProduct[], filterString: string) => {
  const dispatch = useAppDispatch();
  const filteredArray = useMemo(() => {
    if (filterString.trim() === "") {
      return arr;
    } else {
      dispatch(setCurrentPage(1));
      const lowerFilterString = filterString.toLowerCase();
      return arr.filter((item) => {
        const itemName = item.name.toLowerCase();
        const categoryName = item.category.name.toLowerCase();
        const brandName = item.brand?.name.toLowerCase();
        return (
          itemName.includes(lowerFilterString) ||
          categoryName.includes(lowerFilterString) ||
          brandName?.includes(lowerFilterString)
        );
      });
    }
  }, [arr, filterString]);

  return filteredArray;
};

export default useSearchProducts;
