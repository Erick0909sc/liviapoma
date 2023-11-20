import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { changePasswordApi } from '@/states/users/usersApi';
import EditUser from '@/components/Modals/EditUser';
import { useSession } from 'next-auth/react';
import MenuEditUser from '@/components/Modals/MenuEditUser';
import LoaderBtn from '@/components/Cart/LoaderBtn';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleGoBack = () => {
    router.back();
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

    setIsLoading(true);

    if (session) {
      const userId = session.user.id;

      try {
        const response = await changePasswordApi(userId, oldPassword, newPassword);

        if (response.status === 200) {
          toast.success('Contraseña cambiada con éxito');
          setTimeout(() => {
            router.reload();
          }, 1500)
        } else {
          toast.error('Error al cambiar la contraseña');
          setIsLoading(false);
        }
      } catch (error) {
        toast.error('Error al cambiar la contraseña');
        setIsLoading(false);
      }
    } else {
      console.error('El usuario no ha iniciado sesión');
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center   items-center p-3'>


      <div className='w-full pl-3'>
        <button className='flex absolute top-5 text-[35px] items-center' onClick={handleGoBack}>
          <BsFillArrowLeftCircleFill />
        </button>
      </div>

      <div className=' sm:flex lg:flex gap-3  lg:h-[70%]'>
        <div >
          <EditUser />
        </div>
        <div className='bg-white shadow-lg sm:w-[70vw] lg:w-[60vw]  rounded-b-lg lg:flex items-center justify-center sm:border-b-[20px]  lg:border-b-[20px] sm:border-t-[40px]  lg:border-t-[40px] border-green-700'>

          <div className='bg-green-700'>
            <button className='sm:hidden lg:text-[18px] flex items-center font-semibold text-white bg-black p-2' onClick={openModal}>
              <h2>Menu de opciones</h2>
            </button>
          </div>

          <hr />
          <div className='flex flex-col justify-center    items-center p-4 gap-2'>
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
            <div className="flex justify-center">
              <button className='bg-blue-500 w-auto lg:w-[40%] text-white py-2 px-4 rounded hover:bg-blue-700 flex justify-center' onClick={handleSave} disabled={isLoading}>
                {isLoading ? (<LoaderBtn />) : ("Guardar")}
              </button>
              <button className='bg-red-500 text-white py-2 px-4 rounded hover-bg-red-700 ml-2'>
                Cancelar
              </button>
            </div>
          </div>
        </div>


      </div>
      {isModalOpen && <MenuEditUser isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default ChangePassword;
