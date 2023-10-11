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
import Pagination from "@/components/pagination";
import { calcularPrecioConDescuento, itemsPerPage } from "@/shared/ultis";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import Cardcategory from "@/components/CardCategory/Card";
import useCategoriesData from "@/hooks/useCategoriesData";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useSession } from "next-auth/react";

const CategoryPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { category } = router.query;
  const dispatch = useAppDispatch();
  const productsByCategory = useSelector(selectAllProductsByCategory);
  const categories = useCategoriesData();
  //pagination
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;

  const items = productsByCategory.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Restablecer la página actual a 1 al cambiar la categoría
  useEffect(() => {
    setCurrentPageRedux(1);
  }, [productsByCategory]);

  useEffect(() => {
    if (category) {
      dispatch(getAllProductsByCategory(category as string));
    }
  }, [category, dispatch]);

  return (
    <Layout title={`Productos de la categoría ${category}`}>
      <h6 className="text-xl font-normal leading-normal mt-5 mb-2 text-black flex justify-center items-center">Usted esta en la categoria: {category}</h6>
      <div>
        <div className=" gap-2 w-full justify-center h-14 items-center hidden sm:flex ">
          <div className="w-40 text-center border-r border-slate-900">
            <Link href="/products">
              <h2 className="font-bold cursor-pointer hover:text-red-500 mx-1">
                Todos los productos
              </h2>
            </Link>
          </div>
          {categories.map((category, index) => (
            <Cardcategory key={index} name={category} />
          ))}
        </div>
        <div className=" block md:hidden lg:hidden h-14 w-full bg-white ">
          <Swiper
            slidesPerView={3}
            className="mySwiper swiper-h h-full bg-transparent"
            loop={true}
            spaceBetween={10}
            pagination={false}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index} className="w-full ">
                <div className="flex justify-center h-full items-center text-[15px]">
                  <Cardcategory name={category} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col justify-center">
          {items.map((product, index) => (
            <Card
              key={index}
              session={session}
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
          items={productsByCategory.length} // Usar la longitud de los productos filtrados
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
        />
      </div>
    </Layout>
  );
};

export default CategoryPage;
