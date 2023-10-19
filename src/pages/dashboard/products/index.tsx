import React, { useState } from "react";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import Products from "@/components/Dashboard/Products/Products";
import NewProduct from "@/components/Dashboard/Products/NewProduct";

const ProductsPage = () => {
  const states = {
    products: false,
    new: false,
    disabled: false,
  };
  const [component, setComponent] = useState({ ...states, products: true });
  return (
    <LayoutAdmin title="Productos">
      <div className="w-full h-full">
        <div className="flex justify-between">
          <button
            onClick={() =>
              setComponent({
                ...states,
                products: true,
              })
            }
            className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
              component.products
                ? "text-white font-bold bg-crema-500"
                : "text-black"
            }`}
          >
            Productos
          </button>
          <button
            onClick={() =>
              setComponent({
                ...states,
                new: true,
              })
            }
            className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
              component.new
                ? "text-white font-bold bg-crema-500"
                : "text-black"
            }`}
          >
            Nuevo producto
          </button>
        </div>
        {component.products && <Products />}
        {component.new && <NewProduct />}
        {/* {component.disabled && <OffersDisabled />} */}
      </div>
    </LayoutAdmin>
  );
};

export default ProductsPage;
