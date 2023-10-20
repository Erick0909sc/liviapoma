
import { useAppDispatch } from '@/states/store';
import { UserEdit, putUser } from '@/states/users/usersSlice';
import { useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux'; // No necesitas importar 'dispatch' aquí

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const datauser = useSelector(UserEdit);
  const [editedUser, setEditedUser] = useState(datauser);
  // console.log(editedUser);

  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [nameAlert, setNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const updatedUser = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        password: '',
        image: session.user.image,
      };
  
      setEditedUser(updatedUser);
    }
  }, [session]);

  const handleStartEdit = (field: string) => {
    if (field === 'password') {
      setFieldToEdit('password');
      setVerifyPassword(false);
      setPasswordAlert('');
    } else {
      setFieldToEdit(field);
    }
    setIsEditMode(true);
  };

  const handleSave = () => {
    dispatch(
      putUser({
        id: editedUser.id,
        name: editedUser.name,
        email: editedUser.email,
        password: editedUser.password,
        image: editedUser.image,
      })
    );
    alert("se edito correctamente");
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFieldToEdit(null);
    setOldPassword('');
    setNewPassword('');
    setVerifyPassword(false);
    setNameAlert('');
    setEmailAlert('');
    setPasswordAlert('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (fieldToEdit === 'password') {
      if (verifyPassword) {
        setNewPassword(value);
      } else {
        setOldPassword(value);
      }
    } else if (fieldToEdit === 'name' || fieldToEdit === 'email') {
      setEditedUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (fieldToEdit === 'name') {
        setNameAlert('');
      } else if (fieldToEdit === 'email') {
        setEmailAlert('');
      }
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
        <div className="mb-4">
          {isEditMode && fieldToEdit === 'name' ? (
            <div>
              <label className="block text-gray-600 font-bold mb-2">Nombre del usuario:</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {nameAlert && <div className="text-green-500 font-bold">{nameAlert}</div>}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-700"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover-bg-red-700 ml-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div>
              <label
                className="block text-gray-600 font-bold mb-2 cursor-pointer"
                onClick={() => handleStartEdit('name')}
              >
                Nombre del usuario: {editedUser.name}
              </label>
            </div>
          )}
        </div>
        <div className="mb-4">
          {isEditMode && fieldToEdit === 'email' ? (
            <div>
              <label className="block text-gray-600 font-bold mb-2">Correo electrónico:</label>
              <input
                type="text"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {emailAlert && <div className="text-green-500 font-bold">{emailAlert}</div>}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-700"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover-bg-red-700 ml-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div>
              <label
                className="block text-gray-600 font-bold mb-2 cursor-pointer"
                onClick={() => handleStartEdit('email')}
              >
                Correo electrónico: {editedUser.email}
              </label>
            </div>
          )}
        </div>
        <div className="mb-4">
          {isEditMode && fieldToEdit === 'password' ? (
            <div>
              {!verifyPassword ? (
                <div>
                  <label className="block text-gray-600 font-bold mb-2">Contraseña anterior:</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  {passwordAlert && <div className="text-red-500 font-bold">{passwordAlert}</div>}
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-700"
                  >
                    Verificar
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-600 font-bold mb-2">Nueva Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    value={newPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  {passwordAlert && <div className="text-red-500 font-bold">{passwordAlert}</div>}
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-700"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover-bg-red-700 ml-2"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label
                className="block text-gray-600 font-bold mb-2 cursor-pointer"
                onClick={() => handleStartEdit('password')}
              >
                Contraseña: ********
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
