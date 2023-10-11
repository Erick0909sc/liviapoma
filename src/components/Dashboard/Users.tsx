
import React, { useState, useEffect } from 'react'
import { FaUserEdit, FaSave } from 'react-icons/fa';
import { TiUserDelete } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { editRolUsers, selectEditUser } from '@/states/dashboard/users/usersSlice';
import { useAppDispatch } from '@/states/store';

type Props = {
  id: string;
  name: string,
  email: string,
  role: string,
}

const Users = ({ id, name, email, role }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState(role);
  const dispatch = useAppDispatch();

  // const  roledit =  useSelector(selectEditUser);


  const handleRoleChange = (newRole: string) => {
    setEditedRole(newRole);
  };



  const handleSaveRole = () => {
    // console.log("ID del usuario:", id);
    // console.log("Nuevo rol:", editedRole);
    dispatch(editRolUsers({ id, role: editedRole }));
    setIsEditing(false);
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg">
      <div className="p-4">
        <p className="text-sm">Nombre: {name}</p>
        <p className="text-sm">Email: {email}</p>
        <p className="text-sm">Rol: {isEditing ? (
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
          <button onClick={handleSaveRole} className="bg-green-600 text-white py-1 px-4 rounded inline-flex">
            <FaSave />
            Guardar
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white py-1 px-4 rounded inline-flex">
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


  )
}

export default Users;


