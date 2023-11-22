import { patchUserApi } from "@/states/dashboard/users/usersApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUserEdit, FaSave, FaMinusCircle } from "react-icons/fa";
import request from "axios";
import { IUser } from "@/shared/types";
import Image from "next/image";

interface Props extends IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const User = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState("");

  useEffect(() => {
    setEditedRole(props.role);
  }, [props.role]);

  const handleRoleChange = (newRole: string) => {
    setEditedRole(newRole);
  };

  const handleSaveRole = async () => {
    try {
      setIsEditing(true);
      const res = await patchUserApi(props.id, editedRole);
      if (res.status === 200) {
        toast.success(
          (
            res.data as {
              message: string;
            }
          ).message
        );
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
      setIsEditing(false);
    }
  };
  return (
    <div className="bg-white border rounded-lg shadow-lg p-2">
      <div className="flex flex-col justify-center items-center pb-2">
        <Image
          src={props.image}
          alt={props.name}
          unoptimized
          width={100}
          height={100}
        />
        <div>
          <p className="text-sm">Nombre: {props.name}</p>
          <p className="text-sm">Email: {props.email}</p>
          <p className="text-sm">
            Rol:{" "}
            {isEditing ? (
              <select
                value={editedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="border rounded p-1"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            ) : (
              <span>{editedRole}</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {isEditing ? (
          <button
            onClick={handleSaveRole}
            className="bg-green-600 text-white py-1 px-2 rounded inline-flex items-center gap-2"
          >
            <FaSave className="text-lg" />
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-1 px-2 rounded inline-flex items-center gap-2"
          >
            <FaUserEdit className="text-lg" />
            Editar
          </button>
        )}
        {isEditing && (
          <button
            className="bg-red-600 text-white py-1 px-2 rounded inline-flex items-center gap-2"
            onClick={() => setIsEditing(false)}
          >
            <FaMinusCircle className="text-lg" />
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
