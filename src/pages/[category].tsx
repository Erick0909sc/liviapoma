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

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const productsByCategory = useSelector(selectAllProductsByCategory);
  const categories = useSelector(selectAllCategory);

  useEffect(() => {
    if (category) {
      dispatch(getAllProductsByCategory(category));
    }
  }, [category, dispatch]);
  

  return (
    <Layout title={`Productos de la categoría ${category}`}>
      <h1>Productos de la categoría {category}</h1>

      <div className="flex flex-col justify-center">
        {productsByCategory.map((product) => (
          <Card
            key={product.id}
            session={null}
            code={product.code}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            brand={product.marca}
            category={product.category.name}
          />
        ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;
