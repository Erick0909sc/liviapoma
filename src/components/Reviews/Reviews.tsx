import { useSelector } from "react-redux";
import {
  cleanUpReviews,
  getAllReviews,
  selectAllReviews,
  selectAllReviewsStatus,
} from "@/states/reviews/reviewsSlice";
import FormReview from "./FormReview";
import { Session } from "next-auth";
import { useAppDispatch } from "@/states/store";
import { getOneProduct } from "@/states/products/productsSlice";
import { Rating } from "@mui/material";
import CardReview from "./CardReview";
import { useState } from "react";

type Props = {
  session: Session | null;
  productCode: string;
  status: string;
};

const Reviews = ({ session, productCode, status }: Props) => {
  const reviews = useSelector(selectAllReviews);

  const dispatch = useAppDispatch();

  const sortedReviews = reviews.slice().sort((a, b) => {
    // Convertir las cadenas de fecha a objetos de fecha
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.createdAt);

    // Comparar por usuario activo
    if (session) {
      if (a.userId === session.user.id && b.userId !== session.user.id) {
        return -1;
      }
      if (b.userId === session.user.id && a.userId !== session.user.id) {
        return 1;
      }
    }

    // Comparar las fechas de creación
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      // Las fechas son iguales, las reviews del usuario activo se muestran primero

      return 0;
    }
  });

  return (
    <>
      <div className="bg-slate-100 p-2 flex flex-col pb-7 ">
        <div className=" flex justify-center ">
          <div className="w-[100%] sm:w-[50%]">
            <FormReview
              session={session as Session}
              productCode={productCode}
              status={status}
              getAllReviews={() => {
                dispatch(getAllReviews(productCode));
              }}
              getOneProduct={() => {
                dispatch(getOneProduct(productCode));
              }}
            />
          </div>
        </div>

        {/* maqueta para review */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 ">
          {sortedReviews.map((review) => (
            <CardReview
              review={review}
              key={review.id}
              session={session}
              status={status}
              getAllReviews={() => {
                dispatch(getAllReviews(productCode));
              }}
              getOneProduct={() => {
                dispatch(getOneProduct(productCode));
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
