import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  selectAllDashboardProducts,
  selectAllDashboardProductsStatus,
} from "@/states/dashboard/products/productsSlice";
import { EStateGeneric } from "@/shared/types";
import LayaoutAdmin from "@/components/Layout/LayoutAdmin/LayaoutAdmin";
import { itemsPerPage } from "@/shared/ultis";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import Paginate from "@/components/pagination";
import Card from "./Card";

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
  const productDashboard = useSelector(selectAllDashboardProducts);
  // console.log(productDashboard);
  const productsStatus = useSelector(selectAllDashboardProductsStatus);

  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const items = productDashboard.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // const [selectedProduct, setSelectedProduct] = useState<productData | null>(
  //   null
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const openModal = (product: productData) => {
  //     setSelectedProduct(product);
  //     setIsModalOpen(true);
  //   };

  useEffect(() => {
    const fetchData = async () => {
      if (productsStatus === EStateGeneric.IDLE) {
        await dispatch(getAllProducts());
      }
    };
    fetchData();
  }, [dispatch, productsStatus]);

  return (
    <div className="flex flex-col h-full items-center   ">
      {productsStatus === EStateGeneric.PENDING && <p>Loading...</p>}
      {productsStatus === EStateGeneric.FAILED && (
        <p>Failed to load products</p>
      )}

      {productsStatus === EStateGeneric.SUCCEEDED && (
        <div className="grid grid-cols-1 pt-6  sm:grid-cols-2 sm:gap-14 lg:grid-cols-3   justify-center lg:p-6">
          {items.map((product, index) => (
            <div key={index}>
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
      )}

      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPageRedux}
        items={productDashboard.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Products;
