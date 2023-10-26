import React, { ChangeEvent, useState } from "react";
import {
  getAllProducts,
  getAllProductsByCategory,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import useCategoriesData from "@/hooks/useCategoriesData";
import toast from "react-hot-toast";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const FilterByCategory = (props: Props) => {
  const dispatch = useAppDispatch();
  const categories = useCategoriesData();

  // Cargamos las categorías y productos al montar el componente

  // function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
  //   const selectedCategory = event.target.value;
  //   console.log(`Seleccionaste la categoría: ${selectedCategory}`);
  //   props.setSelectedCategory(selectedCategory);

  //   if (selectedCategory === "") {
  //     // Si se selecciona la opción "Todos los productos", cargar todos los productos
  //     dispatch(getAllProducts());
  //   } else {
  //     // Cargar productos por categoría
  //     dispatch(getAllProductsByCategory(selectedCategory));
  //   }
  // }
  function handleCategoryChange(category: string): void {
    console.log(`Seleccionaste la categoría: ${category}`);
    props.setSelectedCategory(category);

    if (category === "") {
      // Si no se selecciona ninguna categoría, cargar todos los productos
      dispatch(getAllProducts());
    } else {
      // Cargar productos por categoría
      dispatch(getAllProductsByCategory(category));
    }
  }

  return (
    <>
      <div className="flex justify-center  gap-4 mt-4 flex-wrap">
        <details className="">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Categorias </span>
            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>
          <div className="border-t border-gray-200 bg-white">
            <ul className="space-y-1 border-t border-gray-200 p-2">
              <li>
                <input
                  type="checkbox"
                  id={`category-checkbox-all`}
                  className="h-3 w-6 rounded border-gray-300"
                  onChange={() => handleCategoryChange("")}
                  checked={props.selectedCategory === ""}
                />
                <label
                  htmlFor={`category-checkbox-all`}
                  className="text-sm font-medium text-gray-700"
                >
                  Todos los productos
                </label>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`category-checkbox-${index}`}
                    className="h-3 w-6 rounded border-gray-300"
                    onChange={() => handleCategoryChange(category)}
                    checked={props.selectedCategory === category}
                  />
                  <label
                    htmlFor={`category-checkbox-${index}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Ordenar Por:</span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white ">
            <ul className="space-y-1 border-t border-gray-200 p-4">
              <li>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Precio Max
                  </span>
                </label>
              </li>

              <li>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Precion Min
                  </span>
                </label>
              </li>

              <li>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Max Rating
                  </span>
                </label>
              </li>
              <li>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Min Rating
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </details>

        <details className="">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Precio </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <div className="border-t border-gray-200 p-4">
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">S/.</span>

                  <input
                    type="text"
                    placeholder="De "
                    className="w-full rounded-md border-black shadow-sm sm:text-sm"
                  />
                </label>

                <label className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">S/.</span>

                  <input
                    type="text"
                    placeholder="A"
                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center gap-5 bottom-2">
              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Buscar
              </button>
              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Limpiar
              </button>
            </div>
          </div>
        </details>
      </div>
    </>
  );
};

export default FilterByCategory;
