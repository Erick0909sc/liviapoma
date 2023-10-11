import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/Layout/Layout";
import {
  getAllProductsByCategory,
  selectAllCategory,
  selectAllProducts,
  selectAllProductsByCategory,
} from "@/states/products/productsSlice";
import Card from "@/components/card";
import { useAppDispatch } from "@/states/store";
import FilterByCategory from "@/components/Filtros/FilterByCategory";
import Pagination from "@/components/pagination";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import { calcularPrecioConDescuento, itemsPerPage } from "@/shared/ultis";

const CategoryPage = () => {
  const router = useRouter();
  const { category: urlCategory } = router.query; // Cambia el nombre de la variable a urlCategory
  const dispatch = useAppDispatch();
  const productsByCategory = useSelector(selectAllProductsByCategory);
  const categories = useSelector(selectAllCategory);
  const products = useSelector(selectAllProducts);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryNames = categories.map((category) => category.name);
  // cosas para el paginado
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;

  // Filtrar productos cada vez que la categoría seleccionada cambie
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.name === selectedCategory)
    : productsByCategory; // Usar productsByCategory en lugar de products para la categoría seleccionada

  //para el paginado
  const items = filteredProducts.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Restablecer la página actual a 1 al cambiar la categoría
  useEffect(() => {
    setCurrentPageRedux(1);
  }, [selectedCategory]);
  //pasamos el selectedCategory para mostrar los products
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory as string); // Establecer selectedCategory a partir de urlCategory
      dispatch(getAllProductsByCategory(urlCategory as string));
    }
  }, [urlCategory, dispatch]);
  console.log(selectedCategory);

  return (
    <Layout title={`Productos de la categoría ${urlCategory}`}>
      <h1>Productos de la categoría {urlCategory}</h1>
      <FilterByCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-col justify-center">
        {items.map((product, index) => (
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
            discount={product.discount}
            discountedPrice={calcularPrecioConDescuento(product)}
          />
        ))}
      </div>
      <Pagination
        items={filteredProducts.length} // Usar la longitud de los productos filtrados
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPageRedux}
      />
    </Layout>
  );
};

export default CategoryPage;
