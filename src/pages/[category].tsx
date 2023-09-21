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

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useAppDispatch();
  const productsByCategory = useSelector(selectAllProductsByCategory);
  const categories = useSelector(selectAllCategory);

  useEffect(() => {
    if (category) {
      dispatch(getAllProductsByCategory(category as string));
    }
  }, [category, dispatch]);
  

  return (
    <Layout title={`Productos de la categoría ${category}`}>
      <h1>Productos de la categoría {category}</h1>

      <div className="flex flex-col justify-center">
        {productsByCategory.map((product, index) => (
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
    </Layout>
  );
};

export default CategoryPage;
