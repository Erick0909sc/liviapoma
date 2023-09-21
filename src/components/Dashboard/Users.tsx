
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
  password: string,
  role: string,
}

const Users = ({ id, name, email, password, role }: Props) => {
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
      <td className="px-2 py-1">{password}</td>
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
      <td className="px-2 py-1 flex gap-2 text-[20px]">
        {isEditing ? (
          <button onClick={handleSaveRole}><FaSave /></button>
        ) : (
          <button onClick={() => setIsEditing(true)}><FaUserEdit /></button>
        )}
        <button><TiUserDelete /></button>
      </td>
    </tr>
  )
}

export default Users;


