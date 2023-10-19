import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import { EStateGeneric } from "@/shared/types";
import { itemsPerPage } from "@/shared/ultis";
import {
  cleanuphiddenProducts,
  hiddenProducts,
  selectAllhiddenProductsStatus,
  selecthiddenproducts,
} from "@/states/dashboard/products/productsSlice";
import {
  selectCurrentPage,
  selectSearch,
  setCurrentPage,
} from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import Paginate from "@/components/pagination";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductsHidden from "@/components/Dashboard/Productshidden";
import useDebounce from "@/hooks/useDebounce";
import useSearchProducts from "@/hooks/useSearchProducts";
import Failed from "@/components/StatesComponents/Failed";
import Pending from "@/components/StatesComponents/Pending";

type Props = {};

const Disabled = (props: Props) => {
  // const productDashboard = useSelector(selecthiddenproducts);
  const search = useDebounce(useSelector(selectSearch));
  const productDashboard = useSearchProducts(
    useSelector(selecthiddenproducts),
    search
  );
  const productsStatus = useSelector(selectAllhiddenProductsStatus);
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
        await dispatch(hiddenProducts());
      }
    };

    fetchData();

    return () => {
      if (
        productsStatus === EStateGeneric.SUCCEEDED ||
        productsStatus === EStateGeneric.FAILED
      ) {
        dispatch(cleanuphiddenProducts());
      }
    };
  }, [dispatch, productsStatus]);

  return (
    <LayoutAdmin title="Productos Deshabilitados">
      <div className="flex flex-col h-full justify-between   ">
        {productsStatus === EStateGeneric.PENDING && <Pending />}
        {productsStatus === EStateGeneric.FAILED && (
          <Failed text="No encontramos productos deshabilitados" />
        )}
        {productsStatus === EStateGeneric.SUCCEEDED && (
          <>
            {search && !items.length && (
              <Failed text="No encontramos productos relacionados con tu búsqueda" />
            )}
            <div className="grid grid-cols-3 justify-center p-6 ">
              {items.map((product, index) => (
                <ProductsHidden
                  key={index}
                  code={product.code}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  brand={product.brand?.name}
                  category={product.category.name}
                  discount={product.discount}
                  image={product.image}
                />
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
    </LayoutAdmin>
  );
};

export default Disabled;
