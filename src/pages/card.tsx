import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import { useSelector } from "react-redux";
import {
  cleanUpProducts,
  getAllProducts,
  selectAllProducts,
  selectAllProductsStatus,
} from "@/states/products/productsSlice";
import { EStateGeneric, IProduct } from "@/shared/types";
import { useAppDispatch } from "@/states/store";
import Paginate from "@/components/pagination";
import Layout from "@/components/Layout/Layout";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import { itemsPerPage } from "@/shared/ultis";


const Cards: React.FC = () => {
  const dispatch = useAppDispatch();
  const productsStatus = useSelector(selectAllProductsStatus);
  const products = useSelector(selectAllProducts);

  // ↓↓↓↓↓↓↓↓↓↓↓ const for pagination ↓↓↓↓↓↓↓↓↓↓↓
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const items = products.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  useEffect(() => {
    const fetchData = async () => {
      if (productsStatus === EStateGeneric.IDLE) {
        await dispatch(getAllProducts());
      }
    };

    fetchData();

    // La función de retorno se ejecuta al desmontar el componente
  });


  return (
    <Layout>
      <>
        <div className="flex flex-col justify-center">
          {productsStatus === EStateGeneric.PENDING ? (
            <p>Loading...</p>
          ) : productsStatus === EStateGeneric.FAILED ? (
            <p>Failed to load products</p>
          ) : (
            items.map((product, index) => (
              <Card
                key={index}
                title={product.name}
                description={product.description}
                price={product.price}
                brand={product.marca}
                image={product.image}
                category={product.category.name}
              />
            ))
          )}
        </div>
        <Paginate currentPage={currentPage} setCurrentPage={setCurrentPageRedux} items={products.length} itemsPerPage={itemsPerPage} />

      </>
    </Layout>
  );
};

export default Cards;

