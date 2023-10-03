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
import useCategoriesData from "@/hooks/useCategoriesData";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const FilterByCategory = (props: Props) => {
  const dispatch = useAppDispatch();
  const categories = useCategoriesData();

  // Cargamos las categorías y productos al montar el componente
  

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


  return (
    <div className="flex justify-center items-center space-x-4 mt-3">
      <label htmlFor="category">Filtrar por Categoría:</label>
      <select
        className="py-3 px-4 border rounded-lg bg-gray-300"
        id="category"
        onChange={handleCategoryChange}
        value={props.selectedCategory}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByCategory;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllProducts,
//   getAllProductsByCategory,
//   selectAllProducts,
//   selectAllProductsByCategory,
// } from "@/states/products/productsSlice";
// import useCategoriesData from "@/hooks/useCategoriesData";
// ; // Asumo que esta importación es correcta

// type Props = {
//   selectedCategory: string;
//   setSelectedCategory: (category: string) => void;
// };

// const FilterByCategory = (props: Props) => {
//   const dispatch = useDispatch();
//   const categories = useCategoriesData();
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const productsByCategory = useSelector(selectAllProductsByCategory)

//   useEffect(() => {
//     // Cuando cambia la categoría seleccionada, actualiza el estado en el componente padre
//     props.setSelectedCategory(selectedCategory);

//     // Llamar a la acción para cargar productos por categoría o todos los productos
//     if (selectedCategory === "") {
//       dispatch(getAllProducts() as any);
//     } else {
//       dispatch(getAllProductsByCategory(selectedCategory) as any );
//     }
//   }, [dispatch, selectedCategory, props]);

//   const handleCategoryChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedCategory(event.target.value);
//   };

//   return (
//     <div className="flex justify-center items-center space-x-4 mt-3">
//       <label htmlFor="category">Filtrar por Categoría:</label>
//       <select
//         className="py-3 px-4 border rounded-lg bg-gray-300"
//         id="category"
//         onChange={handleCategoryChange}
//         value={selectedCategory}
//       >
//         <option value="">Todas las categorías</option>
//         {categories.map((category, index) => (
//           <option key={index} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>
//       <p>
//         Categoría Seleccionada: {selectedCategory || "Todas las categorías"}
//       </p>
//     </div>
//   );
// };

// export default FilterByCategory;
