import React, { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  selectAllCategoriesStatus,
  selectAllCategory,
  getAllProducts,
  getAllProductsByCategory,
  selectAllProducts,
  selectAllProductsByCategory,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import { EStateGeneric } from "@/shared/types";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const FilterByCategory = (props: Props) => {
  const dispatch = useAppDispatch();

  // Cargamos las categorías y productos al montar el componente
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts()); // Cargar todos los productos
  }, [dispatch]);

  const categoriesProducts = useSelector(selectAllCategory);
  const categoryStatus = useSelector(selectAllCategoriesStatus);

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    const selectedCategory = event.target.value;
    console.log(`Seleccionaste la categoría: ${selectedCategory}`)
    props.setSelectedCategory(selectedCategory);

    if (selectedCategory === "") {
      // Si se selecciona la opción "Todos los productos", cargar todos los productos
      dispatch(getAllProducts());
    } else {
      // Cargar productos por categoría
      dispatch(getAllProductsByCategory(selectedCategory));
    }
  }
  console.log(categoryStatus)

  return (
    <div className="flex justify-center items-center space-x-4 mt-3">
      <select
        className="py-3 px-4 border rounded-lg bg-gray-300"
        onChange={handleCategoryChange}
        value={props.selectedCategory}
      >
        <option value="">Todos los productos</option>
        {categoryStatus === EStateGeneric.PENDING ? (
          <option value="" disabled>
            Cargando...
          </option>
        ) : categoryStatus === EStateGeneric.FAILED ? (
          <option value="" disabled>
            Error al cargar las categorías
          </option>
        ) : (
          categoryStatus === EStateGeneric.SUCCEEDED && (
            <>
              {categoriesProducts.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </>
          )
        )}
      </select>
    </div>
  );
};

export default FilterByCategory;
