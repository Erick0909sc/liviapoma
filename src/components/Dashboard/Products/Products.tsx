import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  selectAllDashboardProducts,
  selectAllDashboardProductsStatus,
} from "@/states/dashboard/products/productsSlice";
import { EStateGeneric } from "@/shared/types";
import useDebounce from "@/hooks/useDebounce";
import { itemsPerPage } from "@/shared/ultis";
import {
  selectCurrentPage,
  selectSearch,
  setCurrentPage,
} from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import Paginate from "@/components/pagination";
import Card from "./Card";
import useSearchProducts from "@/hooks/useSearchProducts";
import Pending from "@/components/StatesComponents/Pending";
import Failed from "@/components/StatesComponents/Failed";

type productData = {
  code: string;
  name: string;
  description: string;
  price: number;
  brandId: number;
  image: string;
  discount: number;
  categoryId: number;
};

const Products = () => {
  // const productDashboard = useSelector(selectAllDashboardProducts);
  const search = useDebounce(useSelector(selectSearch));
  const productDashboard = useSearchProducts(
    useSelector(selectAllDashboardProducts),
    search
  );
  const productsStatus = useSelector(selectAllDashboardProductsStatus);
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const items = productDashboard.slice(minItems, maxItems);
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
  }, [dispatch, productsStatus]);

  return (
    <div className="flex flex-col h-full ">
      {productsStatus === EStateGeneric.PENDING && <Pending />}
      {productsStatus === EStateGeneric.FAILED && <Failed />}
      {productsStatus === EStateGeneric.SUCCEEDED && (
        <>
          {search && !items.length && (
            <Failed text="No encontramos productos relacionados con tu búsqueda" />
          )}
          <div className="grid grid-cols-1 pt-6 grid- sm:grid-cols-2 lg:grid-cols-3  lg:p-6">
            {items.map((product, index) => (
              <div key={index} className="grid place-content-center">
                <Card
                  code={product.code}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  brand={product.brand}
                  category={product.category}
                  discount={product.discount}
                  image={product.image}
                  unitOfMeasure={product.unitOfMeasure}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {items.length > 0 && (
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
          items={productDashboard.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default Products;
