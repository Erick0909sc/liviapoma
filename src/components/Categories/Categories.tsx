import React from "react";
import Category from "./Category";
import useCategoriesData from "@/hooks/useCategoriesData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

type Props = {};

const Categories = (props: Props) => {
  const categories = useCategoriesData();

  return (
    <>
      <h3 className="text-center font-bold text-xl my-4 underline underline-offset-4">Categorías</h3>
      <div className="gap-2 w-full justify-center h-14 items-center hidden sm:flex">
        {categories.map((category, index) => (
          <Category key={index} name={category} />
        ))}
      </div>
      <div className="block md:hidden lg:hidden h-14 w-full bg-white ">
        <Swiper
          slidesPerView={3}
          className="mySwiper swiper-h h-full bg-transparent"
          loop={true}
          spaceBetween={10}
          pagination={false}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="w-full ">
              <div className="flex justify-center h-full items-center text-[15px]">
                <Category name={category} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
