import React, { useEffect } from "react";
import Card from "@/components/card";
import { useSelector, useDispatch } from "react-redux";
import {
  cleanUpProducts,
  getAllProducts,
  selectAllProducts,
  selectAllProductsStatus,
} from "@/states/products/productsSlice";
import { EStateGeneric, IProduct } from "@/shared/types";
import { useAppDispatch } from "@/states/store";
import Paginate from "@/components/pagination";


const Cards: React.FC = () => {
  const dispatch = useAppDispatch();
  const productsStatus = useSelector(selectAllProductsStatus);
  const products = useSelector(selectAllProducts);

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
    <>
      <div className="flex flex-col justify-center">
        {productsStatus === EStateGeneric.PENDING ? (
          <p>Loading...</p>
        ) : productsStatus === EStateGeneric.FAILED ? (
          <p>Failed to load products</p>
        ) : (
          products.map((product:any, index) => (
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
      <Paginate items={products} itemsPerPage={5} />
      
    </>
  );
};

export default Cards;

