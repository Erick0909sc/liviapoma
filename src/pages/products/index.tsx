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

import { useSession } from "next-auth/react";

const Products: React.FC = () => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch();
  const productsStatus = useSelector(selectAllProductsStatus);
  const products = useSelector(selectAllProducts);
  // ↓↓↓↓↓↓↓↓↓↓↓ const for pagination ↓↓↓↓↓↓↓↓↓↓↓
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const items = products.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (productsStatus === EStateGeneric.IDLE) {
        await dispatch(getAllProducts());
      }
    };

    fetchData();

    // La función de retorno se ejecuta al desmontar el componenteasadasddadasdsaffdegkfdjkgfdkgfjlkgfdñklglkjgfdklfdgfjldgjdgñksdgsdklgjdgsdñlgdsgjsdjksd
  }, [dispatch, productsStatus, session]);
  return (
    <Layout>
      <>
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
                  brand={product.marca}
                  image={product.image}
                  category={product.category.name}
                />
              ))}
            </div>
          )}
        </div>
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
          items={products.length}
          itemsPerPage={itemsPerPage}
        />
      </>
    </Layout>
  );
};

export default Products;
