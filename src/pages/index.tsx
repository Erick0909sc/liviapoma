import CardRating from "@/components/CardProductbyRating/CardRating";
import Layout from "@/components/Layout/Layout";
import { EStateGeneric } from "@/shared/types";
import { useAppDispatch } from "@/states/store";
import Image from "next/image";
import img from "public/portada02.jpg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
import Offert from "@/components/Offerts/Offert";
import {
  cleanUpOfferts,
  getAllOffers,
  selectAllOffers,
  selectAllOffersStatus,
} from "@/states/globalSlice";
import Link from "next/link";
import Categories from "@/components/Categories/Categories";
import { dataTest } from "@/data/products";
import Product from "@/components/Offerts/Product";
import Card from "@/components/card";
import {
  getAllProductsDiscount,
  selectAllProductsDiscount,
  selectAllProductsDiscountStatus,
} from "@/states/products/productsSlice";
import { calcularPrecioConDescuento } from "@/shared/ultis";
export default function Home() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const offersStatus = useSelector(selectAllOffersStatus);
  const offers = useSelector(selectAllOffers);
  const productsDiscountStatus = useSelector(selectAllProductsDiscountStatus);
  const productsDiscount = useSelector(selectAllProductsDiscount);
  const slidesPerView = 1;

  useEffect(() => {
    (async () => {
      if (offersStatus === EStateGeneric.IDLE) {
        await dispatch(getAllOffers());
      }
      if (productsDiscountStatus === EStateGeneric.IDLE) {
        await dispatch(getAllProductsDiscount());
      }
    })();
    return () => {
      if (offersStatus === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpOfferts());
      }
    };
  }, [dispatch, offersStatus]);

  return (
    <Layout title="Inicio">
      <>
        <div className="relative h-[30rem] md:h-[40rem] text-white">
          <Image
            src={img}
            alt="Imagen de productos"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-green bg-black bg-opacity-50">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-cream">
              Bienvenido a Liviapoma, tu tienda de{" "}
              <span className="text-green-500">ferretería</span> y{" "}
              <span className="text-green-500">materiales de construcción</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl text-center text-cream">
              Encuentra todo lo que necesitas para tus proyectos de construcción
              y renovación.
            </p>
            <Link href="/products">
              <span className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-cream rounded-full text-lg transition duration-300 ease-in-out">
                Ver Productos
              </span>
            </Link>
          </div>
        </div>
        <Categories />
        <div>
          <h3 className="text-center font-bold text-xl my-4 underline underline-offset-4">
            Productos más vendidos
          </h3>
          <Swiper
            slidesPerView={slidesPerView}
            className="w-full xs:w-11/12 ss:w-10/12 sm:w-9/12 md:w-8/12 lg:w-10/12 xl:w-11/12 max-w-6xl my-6"
            spaceBetween={50}
            loop={true}
            pagination={false}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {dataTest.map((product, index) => (
              <SwiperSlide key={index}>
                <Card
                  session={session}
                  code={product.code}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  brand={product.brand?.name as string}
                  image={product.image}
                  category={product.category.name}
                  discount={product.discount}
                  discountedPrice={calcularPrecioConDescuento(product)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex mb-4 gap-4 justify-center flex-wrap w-full">
          {productsDiscount.map((e, index: number) => (
            <Product key={index} oferta={e} />
          ))}
        </div>
        <div className="flex mb-4 gap-4 justify-center flex-wrap w-full">
          {offers.map((e, index: number) => (
            <Offert {...e} key={index} />
          ))}
        </div>
      </>
    </Layout>
  );
}
