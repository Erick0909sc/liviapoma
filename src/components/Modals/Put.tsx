import React from "react";
import { Session } from "next-auth";
import { Rating } from "@mui/material";

type Props = {
  session: Session;
};

const Put = ({ session }: Props) => {
  return (
    <>
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

          <button className="bg-green-700 text-white p-1 rounded">
            Realizar Comentario
          </button>
        </div>

        <div className=" rounded p-4 space-y-2  ">
          <Rating name="rating" />
          <label className="block">
            Comentario:
            <textarea className="block border p-2 rounded w-[100%] h-[15vh]" />
          </label>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Guardar
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Put;
