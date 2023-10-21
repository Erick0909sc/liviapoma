import { patchUserApi } from "@/states/dashboard/users/usersApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUserEdit, FaSave } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import request from "axios";

type Props = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const User = ({ id, name, email, role }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState("");

  useEffect(() => {
    setEditedRole(role);
  }, [role]);

  const handleRoleChange = (newRole: string) => {
    setEditedRole(newRole);
  };

  const handleSaveRole = async () => {
    try {
      setIsEditing(true);
      const res = await patchUserApi(id, editedRole);
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
    <div className="bg-white border rounded-lg shadow-lg">
      <div className="p-4">
        <p className="text-sm">Nombre: {name}</p>
        <p className="text-sm">Email: {email}</p>
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
      <div className="p-4 flex gap-4">
        {isEditing ? (
          <button
            onClick={handleSaveRole}
            className="bg-green-600 text-white py-1 px-4 rounded inline-flex"
          >
            <FaSave />
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-1 px-4 rounded inline-flex"
          >
            <FaUserEdit />
            Editar
          </button>
        )}
        <button className="bg-red-600 text-white py-1 px-4 rounded inline-flex">
          <TiUserDelete />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default User;
