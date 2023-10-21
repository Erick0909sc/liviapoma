
// import EditUser from '@/components/Modals/EditUser';
// import { useAppDispatch } from '@/states/store';
// import { UserEdit, getOneUser, getoneUser, putUser } from '@/states/users/usersSlice';
// import { useSession } from 'next-auth/react';
// import React, { useState, ChangeEvent, useEffect } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { useSelector } from 'react-redux';

// const Index: React.FC = () => {
//   const dispatch = useAppDispatch();
//   // const datauser = useSelector(UserEdit);
//   const dataoneuser = useSelector(getOneUser);
//   const [editedUser, setEditedUser] = useState(dataoneuser);

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [verifyPassword, setVerifyPassword] = useState(false);
//   const [nameAlert, setNameAlert] = useState('');
//   const [emailAlert, setEmailAlert] = useState('');
//   const [passwordAlert, setPasswordAlert] = useState('');

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const { data: session, } = useSession();

//   useEffect(() => {
//     if (session) {
//       const userId = session.user.id;
//       dispatch(getoneUser(userId));
//     }
//   }, [session]);

//   useEffect(() => {
//     if (dataoneuser) {
//       setEditedUser(dataoneuser);
//     }
//   }, [dataoneuser]);

//   const handleStartEdit = (field: string) => {
//     if (field === 'password') {
//       setFieldToEdit('password');
//       setVerifyPassword(false);
//       setPasswordAlert('');
//     } else {
//       setFieldToEdit(field);
//     }
//     setIsEditMode(true);
//   };


//   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const result = e.target?.result as string;
//         setImageFile(file);
//         setImageUrl(result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     dispatch(
//       putUser({
//         id: editedUser.id,
//         name: editedUser.name,
//         email: editedUser.email,
//         password: editedUser.password,
//         image: editedUser.image,
//       })
//     );
//     alert("¡Se editó correctamente!, recuerde que para que este cambio se haga visible tendra que volver a iniciar sesion");
//   };

//   const handleCancel = () => {
//     setIsEditMode(false);
//     setFieldToEdit(null);
//     setOldPassword('');
//     setNewPassword('');
//     setVerifyPassword(false);
//     setNameAlert('');
//     setEmailAlert('');
//     setPasswordAlert('');
//   };

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     if (fieldToEdit === 'password') {
//       if (verifyPassword) {
//         setNewPassword(value);
//       } else {
//         setOldPassword(value);
//       }
//     } else if (fieldToEdit === 'name' || fieldToEdit === 'email') {
//       setEditedUser((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));

//       if (fieldToEdit === 'name') {
//         setNameAlert('');
//       } else if (fieldToEdit === 'email') {
//         setEmailAlert('');
//       }
//     }
//   };

//   return (
//     <div className='flex gap-6 p-6 items-center h-screen'>
//       <div className=' w-[30%] '>
//         <EditUser />
//       </div>
//       <div className="w-[70%] mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
//         <h2 className="text-2xl font-bold mb-4">Editar Datos de Usuario</h2>

//         <div className="mb-4">
//           {/* ///// aqui la caja para la imagen  */}




//         </div>

//         <hr />
//         <div className="mb-4">
//           <label className="block text-gray-600 font-bold mb-2">Nombre del usuario:</label>
//           {isEditMode && fieldToEdit === 'name' ? (
//             <input
//               type="text"
//               name="name"
//               value={editedUser.name}
//               onChange={handleInputChange}
//               className="w-80 p-2 border rounded "
//             />
//           ) : (
//             <span
//               onClick={() => handleStartEdit('name')}
//               className="w-full p-2 border rounded text-gray-500"
//             >
//               {editedUser.name}
//             </span>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 font-bold mb-2">Correo electrónico:</label>
//           {isEditMode && fieldToEdit === 'email' ? (
//             <input
//               type="text"
//               name="email"
//               value={editedUser.email}
//               onChange={handleInputChange}
//               className="w-80 p-2 border rounded"
//             />
//           ) : (
//             <span
//               onClick={() => handleStartEdit('email')}
//               className="w-full p-2 border rounded text-gray-500"
//             >
//               {editedUser.email}
//             </span>
//           )}
//         </div>

//         {isEditMode && (
//           <div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//               onClick={handleSave}
//             >
//               Guardar
//             </button>
//             <button
//               className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ml-2"
//               onClick={handleCancel}
//             >
//               Cancelar
//             </button>
//           </div>
//         )}
//       </div>
//     </div>

//   );
// };

// export default Index;



import EditUser from '@/components/Modals/EditUser';
import { useAppDispatch } from '@/states/store';
import { UserEdit, getOneUser, getoneUser, putUser } from '@/states/users/usersSlice';
import { useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  // const datauser = useSelector(UserEdit);
  const dataoneuser = useSelector(getOneUser);
  const [editedUser, setEditedUser] = useState(dataoneuser);

  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [nameAlert, setNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data: session, } = useSession();

  useEffect(() => {
    if (session) {
      const userId = session.user.id;
      dispatch(getoneUser(userId));
    }
  }, [session]);

  useEffect(() => {
    if (dataoneuser) {
      setEditedUser(dataoneuser);
    }
  }, [dataoneuser]);

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


  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageFile(file);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
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
    alert("¡Se editó correctamente!, recuerde que para que este cambio se haga visible tendra que volver a iniciar sesion");
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
    <div className='flex gap-6 p-6 items-center h-screen'>
      <div className=' w-[30%] '>
        <EditUser />
      </div>
      <div className="w-[70%] mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Editar Datos de Usuario</h2>

        <div className="mb-4">

          <div className="relative w-44 h-44 rounded-full overflow-hidden cursor-pointer transition duration-300 group">
            <label
              htmlFor="photo"
              className="absolute inset-0 flex items-center justify-center text-white text-2xl transition-opacity opacity-0 group-hover:opacity-100"
            >
              <span className="bg-black bg-opacity-50 rounded-full p-2 absolute z-[999]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </span>
            </label>
            <div className="w-full h-full filter group-hover:blur">
              {dataoneuser.image? (
                <img
                  src={editedUser.image}
                  alt="Vista Previa"
                  className='w-full h-full '
                />
              ) : (
                <FaUserCircle className="w-32 h-32 text-gray-500" />
              )}
            </div>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>




        </div>

        <hr />
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">Nombre del usuario:</label>
          {isEditMode && fieldToEdit === 'name' ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="w-80 p-2 border rounded "
            />
          ) : (
            <span
              onClick={() => handleStartEdit('name')}
              className="w-full p-2 border rounded text-gray-500"
            >
              {editedUser.name}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-bold mb-2">Correo electrónico:</label>
          {isEditMode && fieldToEdit === 'email' ? (
            <input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="w-80 p-2 border rounded"
            />
          ) : (
            <span
              onClick={() => handleStartEdit('email')}
              className="w-full p-2 border rounded text-gray-500"
            >
              {editedUser.email}
            </span>
          )}
        </div>

        {isEditMode && (
          <div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ml-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default Index;


