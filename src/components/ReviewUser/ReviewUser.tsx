import React, { ChangeEvent, useState } from "react";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";
import Pending from "../StatesComponents/Pending";
import { postOneReviewByApi } from "@/states/reviews/reviewsApi";
import { Session } from "next-auth";

type Props = {
  session: Session;
  productCode: string;
  status: string;
  getAllReviews: () => void;
};

const ReviewUser = ({ session, productCode, getAllReviews, status }: Props) => {
  const [isReviewing, setReviewing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const handleRatingChange = (
    event: ChangeEvent<{}>,
    newValue: number | null
  ) => {
    // Actualiza el estado 'rating' cuando el usuario selecciona una calificación
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  const startReview = () => {
    setReviewing(true);
  };

  const cancelReview = () => {
    setReviewing(false);
    setRating(0);
    setComment("");
  };

  // maquetado de comentarios

  const saveReview = async () => {
    try {
      const response = await postOneReviewByApi({
        productCode: productCode,
        userId: session.user.id,
        description: comment,
        rating: rating,
      });

      if (response.status === 201) {
        // El comentario se guardó exitosamente
        toast.success("Comentario guardado exitosamente");
        getAllReviews();
        cancelReview(); // Limpia el estado del formulario
      } else {
        // Si la solicitud no fue exitosa, muestra un mensaje de error
        toast.error("Error al guardar el comentario");
        console.error("Error al guardar el comentario");
      }
    } catch (error) {
      // Si hay un error de red, muestra un mensaje de error
      toast.error("Error de red");
      console.error("Error de red:", error);
    }
  };

  if (status === "loading") {
    return <Pending />;
  }

  if (status === "unauthenticated") {
    return <p>Debes estar autenticado para realizar una revisión.</p>;
  }

  return (
    <div className="p-4 flex flex-col  border-2 w-full sm:w-[65%] lg:w-[45%] rounded-lg shadow-lg">
      <div className="flex items-center justify-between pl-2">
        <div className=" flex items-center gap-2">
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-xl font-semibold">{session.user.name}</div>
        </div>

        {!isReviewing ? (
          <button
            onClick={startReview}
            className="bg-green-700 text-white p-1 rounded"
          >
            Realizar Comentario
          </button>
        ) : null}
      </div>

      {isReviewing ? (
        <div className=" rounded p-4 space-y-2  ">
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            // Puedes ajustar la precisión de las estrellas según tus necesidades
          />
          <label className="block">
            Comentario:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block border p-2 rounded w-[100%] h-[15vh]"
            />
          </label>
          <div className="flex space-x-4">
            <button
              onClick={saveReview}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button
              onClick={cancelReview}
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewUser;
