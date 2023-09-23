import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import {
  getAllProductsByCategory,
  selectAllCategory,
  selectAllProductsByCategory,
} from "@/states/products/productsSlice";
import Card from "@/components/card";
import { useAppDispatch } from "@/states/store";
import FilterByCategory from "@/components/Filtros/FilterByCategory";

import { itemsPerPage } from "@/shared/ultis";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import Pagination from "@/components/pagination";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsByCategory = useSelector(selectAllProductsByCategory);
  const categories = useSelector(selectAllCategory);
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const items = productsByCategory.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (category) {
      dispatch(getAllProductsByCategory(category as string));
    }
  }, [category, dispatch]);
  useEffect(() => {
    if (typeof category === "string") {
      // Verificar que category sea una cadena antes de asignarlo
      setSelectedCategory(category);
    } else {
      setSelectedCategory(""); // Otra acción en caso de que category no sea una cadena válida
    }
  }, [category]);
  const handleCategoryChange = (newCategory: string) => {
    // Actualizar la URL cuando cambie la categoría
    router.push(`/categoryPage?category=${newCategory}`);
  };

  return (
    <Layout title={`Productos de la categoría ${category}`}>
      <h1>Productos de la categoría {category}</h1>
      <FilterByCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-col justify-center">
        {items.map((product, index) => (
          <Card
            key={index}
            session={null}
            code={product.code}
            title={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            brand={product.brand?.name}
            category={product.category.name}
          />
        ))}
      </div>
      <Pagination
          items={productsByCategory.length} // Usar la longitud de los productos filtrados
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
        />
    </Layout>
    
  );
};

export default CategoryPage;