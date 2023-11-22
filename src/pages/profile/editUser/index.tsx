import EditUser from "@/components/Modals/EditUser";
import { getOneUser, getoneUser, putUser } from "@/states/users/usersSlice";
import { useSession } from "next-auth/react";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import CustomImagePerfile from "@/components/Custom/CustomImagePerfile";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/states/store";
import toast from "react-hot-toast";
import MenuEditUser from "@/components/Modals/MenuEditUser";
import LoaderBtn from "@/components/Cart/LoaderBtn";

const Index: React.FC = () => {
  const dataoneuser = useSelector(getOneUser);
  const dispatch = useAppDispatch();
  const [editedUser, setEditedUser] = useState(dataoneuser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const userId = session.user.id;
        await dispatch(getoneUser(userId));
      }
    };

    fetchData();
  }, [session, dispatch]);

  useEffect(() => {
    if (dataoneuser) {
      setEditedUser(dataoneuser);
    }
  }, [dataoneuser]);

  const initialValues = {
    image: null as File | null,
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {

        setIsLoading(true);

        if (!hasChanges) {
          toast.error("No se han realizado cambios. No se puede guardar.");
          setIsLoading(false);
          return;
        }
        const response = await dispatch(
          putUser({
            id: editedUser.id,
            name: editedUser.name,
            email: editedUser.email,
            password: editedUser.password,
            image: values.image,
          })
        );
        if (response.meta.requestStatus === "fulfilled") {
          toast.success(
            "¡Se editó correctamente! Recuerde que para que este cambio se haga visible tendrá que volver a iniciar sesión"
          );
          setTimeout(() => {
            router.reload();
          }, 1500)
        } else {
          toast.error(
            "Ups! ocurrio un error porfavor intentar denuevo"
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  });




  const router = useRouter();

  const handleCancel = () => {
    setIsEditMode(false);
    setFieldToEdit(null);
  };

  const handleGoBack = () => {
    router.back();
  };
  const handleImageChange = (changed: boolean) => {
    setHasChanges(changed);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setHasChanges(true);
  };

  return (
    <div className="  h-screen flex flex-col justify-center  sm:justify-start  items-center p-5">
      <div className="w-full  pl-3 ">
        <button
          className="flex absolute  top-3  lg:top-5  text-[30px] lg:text-[35px] items-center"
          onClick={handleGoBack}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </div>

      <div className=' sm:flex  lg:flex gap-3    lg:h-full'>
        <div>
          <EditUser />
        </div>

        <div className=" bg-white shadow-lg w-full   sm:w-[70vw] sm:h-auto lg:w-[60vw] rounded-b-lg lg:border-b-[20px] sm:border-t-[40px] lg:border-t-[40px] sm:border-b-[20px]  border-green-700">

          <div className='bg-green-700'>
            <button className='sm:hidden lg:text-[18px] flex items-center font-semibold text-white bg-black p-2' onClick={openModal}>
              <h2>Menu de opciones</h2>
            </button>
          </div>


          <hr />
          <form
            className="mx-auto  p-6 rounded-lg  text-center"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-4">Editar Datos de Usuario</h2>
            <div className="relative mb-4">
              <CustomImagePerfile
                formik={formik}
                fieldName="image"
                fieldNameTranslate={"imagen"}
                initialPhoto={dataoneuser.image}
                onImageChange={handleImageChange}
              />
            </div>
            <hr />
            <div className="mb-4">
              <label className="block text-gray-600 font-bold mb-2">
                Nombre del usuario:
              </label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="lg:w-80 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-bold mb-2">
                Correo electrónico:
              </label>
              <input
                type="text"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="lg:w-80 p-2 border rounded"
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-500 w-auto lg:w-[10%] text-white py-2 px-4 rounded hover:bg-blue-700 flex justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (<LoaderBtn />) : ("Guardar")}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 ml-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && <MenuEditUser isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Index;
