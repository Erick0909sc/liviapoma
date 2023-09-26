import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import { IOfferDashboard } from "@/shared/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import EditOffer from "./EditOffer";
const Card = (props: IOfferDashboard) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editConfirmation, setEditConfirmation] = useState(false);
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
          message="¿Estás seguro de que deseas eliminar esta oferta?"
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() =>
            // handleDelete({
            //   ...propsForFunctions,
            // })
            alert("Deleting")
          }
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
      {editConfirmation && (
        <EditOffer
          // title="Eliminar Ofera"
          // message="¿Estás seguro de que deseas eliminar esta oferta?"
          // confirmText="Eliminar"
          // cancelText="Cancelar"
          onConfirm={() =>
            // handleDelete({
            //   ...propsForFunctions,
            // })
            alert("Deleting")
          }
          onCancel={() => setEditConfirmation(false)}
          {...props}
        />
      )}
    </div>
  );
};

export default Card;
