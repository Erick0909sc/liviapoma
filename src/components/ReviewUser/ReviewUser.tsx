import React, { ChangeEvent, useState } from "react";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";
import Pending from "../StatesComponents/Pending";
import { postOneReviewByApi } from "@/states/reviews/reviewsApi";
import { Session } from "next-auth";
import { useSelector } from "react-redux";
import { selectAllReviews } from "@/states/reviews/reviewsSlice";
import { IReview } from "@/shared/types";
import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import { handleDelete } from "@/shared/ultis";

type Props = {
  session: Session;
  productCode: string;
  status: string;
  getAllReviews: () => void;
  getOneProduct: () => void;
};

const ReviewUser = ({
  session,
  productCode,
  getAllReviews,
  getOneProduct,
  status,
}: Props) => {
  
  const [isReviewing, setReviewing] = useState(false);
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  

 

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
        console.log(response.data);
        // El comentario se guardó exitosamente
        toast.success("Comentario guardado exitosamente");
        getAllReviews();
        getOneProduct();
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

  const handleUpdateReview = async (
    review: IReview,
    updatedDescription: string,
    updatedRating: number
  ) => {
    console.log("Updating Review:", review);

    try {
      const response = await fetch(`/api/v1/reviews?id=${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: review.userId,
          productCode: review.productCode,
          id: review.id,
          description: updatedDescription,
          rating: updatedRating,
        }),
      });

      if (response.status === 200) {
        toast.success("Revisión actualizada exitosamente");
        
        getAllReviews();
        getOneProduct();
      } else {
        toast.error("Error al actualizar la revisión");
      }
    } catch (error) {
      console.error("Error de red al actualizar la revisión:", error);
      toast.error("Error de red al actualizar la revisión");
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    console.log("Eliminando reseña con ID:", reviewId);
    try {
      const response = await fetch(`/api/v1/reviews?id=${reviewId}`, {
        method: "DELETE",
      });
  
      console.log("Estado de respuesta de eliminación:", response.status);
  
      if (response.status === 200) {
        console.log("¡Reseña eliminada con éxito!");
        toast.success("Revisión eliminada exitosamente");
        console.log("Reseñas antes de la eliminación:", reviews);
        getAllReviews();
        getOneProduct();
        setDeleteConfirmation(false); // Cierra el modal después de la eliminación exitosa
        console.log("Reseñas después de la eliminación:", reviews);
      } else {
        console.error("Error al eliminar la reseña");
        toast.error("Error al eliminar la reseña");
      }
    } catch (error) {
      console.error("Error de red al eliminar la reseña:", error);
      toast.error("Error de red al eliminar la reseña");
    }
  };
  const reviews = useSelector(selectAllReviews);
  const userReviews = reviews.filter(
    (review) => review.userId === session?.user.id
  );
  

  if (status === "loading") {
    return <Pending />;
  }

  if (status === "unauthenticated") {
    return <p>Debes estar autenticado para realizar una revisión.</p>;
  }

  return (
    <div className="flex w-full justify-center flex-col">
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
      <div>
        <h2 className="flex justify-center items-center">Tus Reseñas</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {userReviews.map((review) => (
          <div key={review.id} className="border p-4 rounded shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={review.user.image}
                alt={review.user.name}
                className="w-12 h-12 rounded-full"
              />

              <div className="text-xl font-semibold">{review.user.name}</div>
            </div>
            <Rating value={review.rating} readOnly />
            <p>{review.description}</p>
            <div className="flex flex-row gap-2 justify-end">
              <button
                onClick={() => {
                  if (selectedReview) {
                    startReview();
                    handleUpdateReview(selectedReview, comment, rating);
                  }
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded w-20 flex justify-center"
              >
                Actualizar
              </button>
              <button
                onClick={() => {
                  setSelectedReview(review); // Establecer la revisión seleccionada
                  setDeleteConfirmation(true); // Mostrar el modal de confirmación
                }}
                className="bg-red-500 text-white px-4 py-2 rounded 20 w-20 flex justify-center"
                type="submit"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {deleteConfirmation && (
        <DeleteConfirmation
          title="Eliminar Producto"
          message="¿Estás seguro de que deseas eliminar este producto de tu carrito de compras? Ten en cuenta que este producto se eliminará del carrito, pero aún puedes agregarlo nuevamente en el futuro si lo necesitas."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() => {
            // Verifica si selectedReview no es null antes de llamar a handleDeleteReview
            if (selectedReview) {
              handleDeleteReview(selectedReview.id);
              setDeleteConfirmation(false); // Cierra el modal después de la confirmación
            }
          }}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ReviewUser;