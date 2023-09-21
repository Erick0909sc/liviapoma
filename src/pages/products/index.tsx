import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import { useSelector } from "react-redux";
import {
  selectAllCategory,
  getAllProducts,
  selectAllProducts,
  selectAllProductsStatus,
} from "@/states/products/productsSlice";
import { EStateGeneric, IProduct } from "@/shared/types";
import { useAppDispatch } from "@/states/store";
import Layout from "@/components/Layout/Layout";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import { itemsPerPage } from "@/shared/ultis";

import { useSession } from "next-auth/react";

import Pagination from "@/components/pagination";
import FilterByCategory from "@/components/Filtros/FilterByCategory";

const Products: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const productsStatus = useSelector(selectAllProductsStatus);
  const products = useSelector(selectAllProducts); // Declaración de products
  const categories = useSelector(selectAllCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const categoryNames = categories.map((category) => category.name);

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

  // Restablecer la página actual a 1 al cambiar la categoría
  useEffect(() => {
    setCurrentPageRedux(1);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      if (productsStatus === EStateGeneric.IDLE) {
        await dispatch(getAllProducts());
      }
    };

    fetchData();
  }, [dispatch, productsStatus, session]);

  return (
    <Layout title="Productos">
      <>
        <FilterByCategory
          categories={categoryNames}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="flex flex-col justify-center">
          {productsStatus === EStateGeneric.PENDING && <p>Loading...</p>}
          {productsStatus === EStateGeneric.FAILED && (
            <p>Failed to load products</p>
          )}
          {productsStatus === EStateGeneric.SUCCEEDED && (
            <div>
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