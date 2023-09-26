
import React, { useState,useEffect } from 'react'
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
    console.log("ID del usuario:", id);
    console.log("Nuevo rol:", editedRole);
    dispatch(editRolUsers({ id, role: editedRole }));
    setIsEditing(false);
  };

  return (
    <tr className="text-center">
      <td className="px-2 py-1">{id}</td>
      <td className="px-2 py-1">{name}</td>
      <td className="px-2 py-1">{email}</td>
      <td className="px-2 py-1">
        {isEditing ? (
          <select
            value={editedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>

          </select>
        ) : (
          <span>{editedRole}</span>
        )}
      </td>
      <td className="px-2 py-1 flex gap-4  ">
        {isEditing ? (
          <button onClick={handleSaveRole} className='flex text-[15px] bg-green-600 p-1 px-2 text-white rounded-[10px]'><FaSave className='text-[18px] '/> Guardar</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className='flex gap-2 bg-blue-600 p-1 px-2 text-white rounded-[10px]'><FaUserEdit className='text-[18px]'/>Editar</button>
        )}
        <button className='flex text-[15px] gap-2 bg-red-600 p-1 px-2 text-white rounded-[10px]  '><TiUserDelete  className='text-[18px]'/>Eliminar</button>
      </td>
    </tr>
  )
}

export default Users;


