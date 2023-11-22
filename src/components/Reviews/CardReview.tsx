import { IReview } from "@/shared/types";
import { Rating } from "@mui/material";
import { Session } from "next-auth";
import { useState } from "react";
import FormReview from "./FormReview";
import { deleteReviewByApi } from "@/states/reviews/reviewsApi";
import toast from "react-hot-toast";
import { formatFechaISO } from "@/shared/ultis";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteConfirmation from "../Modals/DeleteConfirmation";

type Props = {
  review: IReview;
  session: Session | null;
  status: string;
  getAllReviews: () => void;
  getOneProduct: () => void;
};

const CardReview = ({
  review,
  session,
  status,
  getAllReviews,
  getOneProduct,
}: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar la apertura del modal de eliminación

  const handleDeleteReview = async () => {
    const res = await deleteReviewByApi(review.id);
    if (res.status === 200) {
      getAllReviews();
      getOneProduct();
      return toast.success("Reseña eliminada Correctamente"); 
    } else {
      return toast.error("Reseña no eliminada ");
    }
    setIsDeleteModalOpen(false); // Cierra el modal después de confirmar la eliminación
  };
  const isEdited = review.createdAt !== review.updatedAt;

  return (
    <div className="relative border p-4 rounded shadow-md bg-white h-min">
      <div className="flex items-center gap-3">
        <img
          src={review.user.image}
          alt={review.user.name}
          className="w-12 h-12 rounded-full"
        />

        <div className="text-xl font-semibold">{review.user.name}</div>
      </div>
      <div className="flex flex-row gap-2 justify-end">
        {/* Muestra información sobre la creación o edición de la revisión */}
        {isEdited ? (
          <p>Editado: {formatFechaISO(review.updatedAt)}</p>
        ) : (
          <p>Creado: {formatFechaISO(review.createdAt)}</p>
        )}
      </div>
      <Rating value={review.rating} readOnly />
      <p>{review.description}</p>
      {status === "authenticated" && session?.user.id === review.userId && (
        <div className="flex flex-row gap-2 justify-end">
          {!isUpdating && (
            <>
              <button
                className="bg-yellow-500 text-white px-2 py-2 rounded w-10 flex justify-center"
                onClick={() => setIsUpdating(!isUpdating)}
              >
                <FaEdit /> {/* Ícono de editar */}
              </button>

              {/* Utiliza el ícono FaTrash para el botón de eliminar */}
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 text-white px-2 py-2 rounded w-10 flex justify-center"
                type="submit"
              >
                <FaTrash /> {/* Ícono de eliminar */}
              </button>
            </>
          )}
        </div>
      )}
      {session && isUpdating && (
        <div className="w-[full] ">
          <FormReview
            session={session}
            productCode={review.productCode}
            status={status}
            getAllReviews={getAllReviews}
            getOneProduct={getOneProduct}
            existComment={review.description}
            existRating={review.rating}
            isOpen={isUpdating}
            setIsOpen={() => setIsUpdating(false)}
            idReview={review.id}
          />
        </div>
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmation
          title="Eliminar Review"
          message="¿Estás seguro de que deseas eliminar esta reseña?"
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDeleteReview}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CardReview;
