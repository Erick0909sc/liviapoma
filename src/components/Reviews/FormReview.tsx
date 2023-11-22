import React, { ChangeEvent, useState } from "react";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";
import Pending from "../StatesComponents/Pending";
import {
  postOneReviewByApi,
  putOneReviewByApi,
} from "@/states/reviews/reviewsApi";
import { Session } from "next-auth";
import request from "axios";
import { IReview } from "@/shared/types";

type Props = {
  session: Session;
  productCode: string;
  status: string;
  getAllReviews: () => void;
  getOneProduct: () => void;
  idReview?: number;
  setIsOpen?: (value: boolean) => void;
  isOpen?: boolean;
  existComment?: string;
  existRating?: number;
};

const FormReview = ({
  session,
  productCode,
  getAllReviews,
  getOneProduct,
  status,
  setIsOpen,
  idReview,
  isOpen = false,
  existComment = "",
  existRating = 0,
}: Props) => {
  const [isReviewing, setReviewing] = useState(isOpen);
  const [rating, setRating] = useState(existRating);
  const [isSaving, setSaving] = useState(false); // Nuevo estado para controlar la desactivación del botón
  const [comment, setComment] = useState(existComment);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);

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
    if (setIsOpen) {
      setIsOpen(false);
    }
    setReviewing(false);
    setRating(0);
    setComment("");
  };

  // maquetado de comentarios

  const saveReview = async () => {
    if (comment.trim().length === 0) {
      return toast.error("El comentario no puede estar vacío");
    }

    // Validar que la calificación sea al menos 1 estrella
    if (rating < 1) {
      return toast.error("Debes seleccionar al menos 1 estrella");
    }
    try {
      setSaving(true); // Activar el indicador de carga al iniciar la solicitud

      if (idReview) {
        const res = await putOneReviewByApi({
          id: idReview,
          productCode: productCode,
          userId: session.user.id,
          description: comment,
          rating: rating,
        });

        if (res.status === 200) {
          getAllReviews();
          getOneProduct();
          cancelReview();
          return toast.success("Revisión actualizada exitosamente");
        }
      } else {
        const response = await postOneReviewByApi({
          productCode: productCode,
          userId: session.user.id,
          description: comment,
          rating: rating,
        });

        if (response.status === 201) {
          // El comentario se guardó exitosamente
          toast.success("¡Comentario guardado con éxito!");
          getAllReviews();
          getOneProduct();
          cancelReview(); // Limpia el estado del formulario
        }
      }
    } catch (error) {
      if (request.isAxiosError(error) && error.response) {
          toast.error(
            (
              error.response?.data as {
                message: string;
              }
            ).message
          );
        }
    } finally {
      setSaving(false); // Desactivar el indicador de carga después de la solicitud
    }
  };

  if (status === "loading") {
    return <Pending />;
  }

  if (status === "unauthenticated") {
    return (
      <p className="flex justify-center text-red-500 text-lg mt-10">
        Debes estar autenticado para realizar una revisión.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4 flex flex-col border-2 rounded-lg shadow-lg bg-white">
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
          <div className=" rounded p-4 space-y-2 ">
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
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar"}
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
    </div>
  );
};

export default FormReview;
