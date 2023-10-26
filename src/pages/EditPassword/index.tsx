import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { changePasswordApi } from '@/states/users/usersApi';
import EditUser from '@/components/Modals/EditUser';
import { useSession } from 'next-auth/react';

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { data: session } = useSession();

  const handleSave = async () => {
    const { oldPassword, newPassword } = formData;



    if (session) {
      const userId = session.user.id;

      try {
        const response = await changePasswordApi(userId, oldPassword, newPassword);

        if (response.status === 200) {
          alert('Contraseña cambiada con éxito');
          router.push('/');
        } else {
          alert('Error al cambiar la contraseña');
        }
      } catch (error) {
        alert('Error al cambiar la contraseña');
      }
    } else {
      console.error('El usuario no ha iniciado sesión');
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center p-3'>


      <div className='w-full pl-3'>
        <button className='flex absolute top-5 text-[35px] items-center' onClick={handleGoBack}>
          <BsFillArrowLeftCircleFill />
        </button>
      </div>

      <div className='bg-white shadow-lg lg:w-[60vw]  rounded-lg'>
        <div >
          <EditUser />
        </div>
        <hr />
        <div className='flex flex-col justify-center items-center p-4 gap-2'>
          <div className='text-[25px] pb-5 font-semibold'>
            <h2>Edición de contraseña</h2>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-2'>Contraseña antigua:</label>
            <input
              type='password'
              name='oldPassword'
              value={formData.oldPassword}
              onChange={handleChange}
              className='lg:w-80 p-2 border rounded'
              placeholder='Ingrese su antigua contraseña'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-2'>Contraseña nueva:</label>
            <input
              type='password'
              name='newPassword'
              value={formData.newPassword}
              onChange={handleChange}
              className='lg:w-80 p-2 border rounded'
              placeholder='Ingrese su nueva contraseña'
            />
          </div>
          <div>
            <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700' onClick={handleSave}>
              Guardar
            </button>
            <button className='bg-red-500 text-white py-2 px-4 rounded hover-bg-red-700 ml-2'>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
