import React, { ChangeEvent } from "react";
import {
  selectAllCategoriesStatus,
  selectAllCategory,
  selectAllProducts,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import { useSelector } from "react-redux";
import { EStateGeneric } from "@/shared/types";

type Props = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const FilterByCategory = (props: Props) => {
  const dispatch = useAppDispatch();

  const categoriesProducts = useSelector(selectAllCategory);
  const categoryStatus = useSelector(selectAllCategoriesStatus);

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    const selectedCategory = event.target.value;
    props.setSelectedCategory(selectedCategory);
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-3">
      <select className="py-3 px-4 border rounded-lg bg-gray-300" onChange={handleCategoryChange} value={props.selectedCategory}>
        <option value="">Seleciona una categoria</option>
        <option value="">All Products</option>
        {categoryStatus === EStateGeneric.PENDING ? (
          <option value="" disabled>
            Loading...
          </option>
        ) : categoryStatus === EStateGeneric.FAILED ? (
          <option value="" disabled>
            Failed to load Categories
          </option>
        ) : (
          props.categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default FilterByCategory;
