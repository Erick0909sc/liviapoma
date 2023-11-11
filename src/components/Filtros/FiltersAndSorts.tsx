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
import { FaAngleDown } from "react-icons/fa6";
import toast from "react-hot-toast";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const FiltersAndSorts = (props: Props) => {
  const dispatch = useAppDispatch();
  const categories = useCategoriesData();
  const arrSorts = useSelector(selectAllSorts);
  const filters = useSelector(selectAllFilters);
  const findFilterByRange = filters
    .find((filter) => filter.name === "filterByRange")
    ?.value.split("-");
  const [input, setInput] = useState({
    first: findFilterByRange ? findFilterByRange[0] : "",
    second: findFilterByRange ? findFilterByRange[1] : "",
  });
  const isFilterActive = (filter: { name: string; value: string }) =>
    arrSorts.some((f) => f.name === filter.name && f.value === filter.value);
  function handleCategoryChange(category: string): void {
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
    const firstValue = parseFloat(input.first);
    const secondValue = parseFloat(input.second);

    if (
      !isNaN(firstValue) &&
      !isNaN(secondValue) &&
      secondValue <= firstValue
    ) {
      return toast.error("El segundo valor debe ser mayor que el primero");
    } else if (!firstValue || !secondValue)
      return toast.error("Por favor, ingresa ambos valores para continuar.");
    const value = `${input.first}-${input.second}`;
    const filterByRange = { name: "filterByRange", value };
    dispatch(setFilters(filterByRange));
  };
  const handleFilterByRangeClear = () => {
    setInput((prev) => ({
      ...prev,
      first: "",
      second: "",
    }));
    const filterByRange = { name: "filterByRange", value: "" };
    dispatch(setFilters(filterByRange));
  };
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
  console.log(filters);
  return (
    <>
      <div className="flex justify-center  gap-4 mt-4 flex-wrap">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Categorias </span>
            <span className="transition group-open:-rotate-180">
              <FaAngleDown className="text-lg" />
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

        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition ">
            <span className="text-sm font-medium"> Ordenar Por:</span>
            <span className="transition group-open:-rotate-180">
              <FaAngleDown className="text-lg" />
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
                      onChange={() =>
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

        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Precio </span>

            <span className="transition group-open:-rotate-180">
              <FaAngleDown className="text-lg" />
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
                    onBlur={(e) => {
                      const firstValue = parseFloat(input.first);
                      const secondValue = parseFloat(e.target.value);

                      if (
                        !isNaN(firstValue) &&
                        !isNaN(secondValue) &&
                        secondValue <= firstValue
                      ) {
                        toast.error(
                          "El segundo valor debe ser mayor que el primero"
                        );
                      }
                    }}
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
                className="text-sm text-gray-900 underline underline-offset-4 disabled:opacity-50"
                onClick={handleFilterByRangeClear}
                disabled={!filters.some((f) => f.name === "filterByRange")}
              >
                Limpiar
              </button>
            </div>
          </div>
        </details>
        <label className="flex border-gray-200 bg-white p-4 h-min">
          <input
            type="checkbox"
            value="PENDIENTE"
            checked={filters.some((f) => f.name === "filterByDiscount")}
            onChange={() => {
              const filterByDiscount = {
                name: "filterByDiscount",
                value: "",
              };
              dispatch(setFilters(filterByDiscount));
            }}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">Productos con descuento</span>
        </label>
      </div>
    </>
  );
};

export default FiltersAndSorts;
