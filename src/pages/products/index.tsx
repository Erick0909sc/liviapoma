import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  selectAllProducts,
  selectAllProductsStatus,
  getAllProductsByCategory,
} from "@/states/products/productsSlice";
import { EStateGeneric, IProduct } from "@/shared/types";
import { useAppDispatch } from "@/states/store";
import Layout from "@/components/Layout/Layout";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import { calcularDescuentoItemCart, calcularPrecioConDescuento, itemsPerPage } from "@/shared/ultis";

import { useSession } from "next-auth/react";

import Pagination from "@/components/pagination";
import FilterByCategory from "@/components/Filtros/FilterByCategory";
import { useRouter } from "next/router";


const Products: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productsStatus = useSelector(selectAllProductsStatus);
  const products = useSelector(selectAllProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // ↓↓↓↓↓↓↓↓↓↓↓ const for pagination ↓↓↓↓↓↓↓↓↓↓↓
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.name === selectedCategory)
    : products;

  const items = filteredProducts.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  useEffect(() => {
    const { query } = router;
    const categoryFromURL = query.category as string;
    if (categoryFromURL) {
      // Si hay una categoría en la URL, seleccionarla
      setSelectedCategory(categoryFromURL);
    } 
  }, [router]);

  // Almacenar el filtro de categoría seleccionado en LocalStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  // Restablecer la página actual a 1 al cambiar la categoría
  useEffect(() => {
    setCurrentPageRedux(1);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      if (productsStatus === EStateGeneric.IDLE) {
        // Utiliza la acción getAllProducts si selectedCategory no está definida
        if (!selectedCategory) {
          await dispatch(getAllProducts());
        } else {
          // Utiliza la acción getAllProductsByCategory con la categoría seleccionada
          await dispatch(getAllProductsByCategory(selectedCategory));
        }
      }
    };

    fetchData();
  }, [dispatch, productsStatus, session, selectedCategory]);
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    router.push(`/products?category=${newCategory}`);
  };

  return (
    <Layout title="Productos">
      <>
        <FilterByCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
        <div className="flex flex-col justify-center">
          {productsStatus === EStateGeneric.PENDING && <p>Loading...</p>}
          {productsStatus === EStateGeneric.FAILED && (
            <p>Failed to load products</p>
          )}
          {productsStatus === EStateGeneric.SUCCEEDED && (
            <div className="flex flex-col gap-8 py-8" >
              {items.map((product, index) => (
                <Card 
                  key={index}
                  session={session}
                  code={product.code}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  brand={product.brand?.name}
                  image={product.image}
                  category={product.category.name}
                  discount={product.discount} 
                  discountedPrice={calcularPrecioConDescuento(product)}
                />
              ))}
            </div>
          )}
        </div>
        <Pagination
          items={filteredProducts.length} // Usar la longitud de los productos filtrados
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
        />
      </>
    </Layout>
  );
};

export default Products;
