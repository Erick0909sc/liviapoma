import React, { ChangeEvent, useState } from "react";
import {
  getAllProducts,
  getAllProductsByCategory,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import useCategoriesData from "@/hooks/useCategoriesData";
import { useSelector } from "react-redux";
import {
  selectAllFilters,
  selectAllSorts,
  setFilters,
  setOrders,
} from "@/states/globalSlice";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const FiltersAndSorts = (props: Props) => {
  const dispatch = useAppDispatch();
  const categories = useCategoriesData();
  const arrSorts = useSelector(selectAllSorts);
  const filters = useSelector(selectAllFilters);
  const [input, setInput] = useState({
    first: "",
    second: "",
  });
  const isFilterActive = (filter: { name: string; value: string }) =>
    arrSorts.some((f) => f.name === filter.name && f.value === filter.value);
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
  const handleFilters = (filter: { name: string; value: string }) => {
    dispatch(setOrders(filter));
  };
  const handleFilterByRange = () => {
    const value = `${input.first}-${input.second}`;
    const filterByRange = { name: "filterByRange", value };
    dispatch(setFilters(filterByRange));
  };
  console.log(filters);

  const sorts = [
    { name: "sortByName", value: "asc", title: "Ascendente (A - Z)" },
    { name: "sortByName", value: "desc", title: "Descendente (Z - A)" },
    { name: "sortByRating", value: "asc", title: "Menor a Mayor Calificación" },
    {
      name: "sortByRating",
      value: "desc",
      title: "Mayor a Menor Calificación",
    },
    { name: "sortByPrice", value: "asc", title: "Menor a Mayor Precio" },
    { name: "sortByPrice", value: "desc", title: "Mayor a Menor Precio" },
  ];

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
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white ">
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {sorts.map((e) => (
                <li key={e.title}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300"
                      onClick={() =>
                        handleFilters({ name: e.name, value: e.value })
                      }
                      checked={isFilterActive({ name: e.name, value: e.value })}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {e.title}
                    </span>
                  </label>
                </li>
              ))}
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                    value={input.first}
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        first: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">S/.</span>

                  <input
                    type="text"
                    placeholder="A"
                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    value={input.second}
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        second: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center gap-5 bottom-2">
              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
                onClick={handleFilterByRange}
              >
                Buscar
              </button>
              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
                onClick={() => {
                  setInput((prev) => ({
                    ...prev,
                    first: "0",
                    second: "0",
                  }));
                  handleFilterByRange();
                }}
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

export default FiltersAndSorts;
