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
export default function Home() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const offersStatus = useSelector(selectAllOffersStatus);
  const offers = useSelector(selectAllOffers);
  const slidesPerView = 1;

  useEffect(() => {
    (async () => {
      if (offersStatus === EStateGeneric.IDLE) {
        await dispatch(getAllOffers());
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
        <div className=" flex flex-col h-[30rem]  md:h-[30rem] lg:h-[40rem] pb-8">
          <div className="w-full h-20 flex items-center justify-center p-5 text-[20px] font-bold">
            <h2>PRODUCTOS MAS VENDIDOS</h2>
          </div>
          <Swiper
            slidesPerView={slidesPerView}
            className="mySwiper swiper-h w-[100%] md::w-[80%] lg:w-[80%]"
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
                <CardRating
                  session={session}
                  code={product.code}
                  name={product.name}
                  image={product.image}
                  rating={product.rating}
                  description={product.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex mb-4 gap-4 justify-center flex-wrap w-full">
          {offers.map((e, index: number) => (
            <Offert {...e} key={index} />
          ))}
        </div>
        <div className="flex mb-4 gap-4 justify-center flex-wrap w-full">
          {dataTest.map((e, index: number) => (
            <Product key={index} oferta={e} />
          ))}
        </div>
      </>
    </Layout>
  );
}
