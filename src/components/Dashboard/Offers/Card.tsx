import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import { IOfferDashboard } from "@/shared/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import EditOffer from "./EditOffer";
import { deleteOfferDashboardByApi } from "@/states/dashboard/offers/offersApi";
import { useAppDispatch } from "@/states/store";
import { getAllOffers } from "@/states/dashboard/offers/offersSlice";
import toast from "react-hot-toast";
const Card = (props: IOfferDashboard) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editConfirmation, setEditConfirmation] = useState(false);
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      const res = await deleteOfferDashboardByApi(props.id);
      if (res.status === 200) {
        toast.success(res.data.message, { duration: 5000 });
      }
    } catch (error) {
      toast.error(
        "Lo siento, ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
        { duration: 5000 }
      );
    } finally {
      await dispatch(getAllOffers());
    }
  };
  return (
    <div className="w-full flex flex-col justify-between bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src={props.image}
        alt="Oferta"
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => setEditConfirmation(true)}
          >
            Editar
            <FaEdit />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => setDeleteConfirmation(true)}
          >
            Eliminar
            <FaTrash />
          </button>
        </div>
      </div>
      {deleteConfirmation && (
        <DeleteConfirmation
          title="Eliminar Ofera"
          message="¿Estás seguro de que deseas eliminar esta oferta? Al hacerlo, todos los productos relacionados perderán el descuento asociado y quedarán sin descuento."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
      {editConfirmation && (
        <EditOffer onCancel={() => setEditConfirmation(false)} {...props} />
      )}
    </div>
  );
};

export default Card;
