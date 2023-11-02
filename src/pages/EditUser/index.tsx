import EditUser from "@/components/Modals/EditUser";
// import { useAppDispatch } from '@/states/store';
import { getOneUser, getoneUser, putUser } from "@/states/users/usersSlice";
// import { getOneUser, putUser } from '@/states/users/usersSlice';
import { useSession } from "next-auth/react";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";

import { useFormik } from "formik";
// import * as Yup from "yup";
import CustomImagePerfile from "@/components/Custom/CustomImagePerfile";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/states/store";
import toast from "react-hot-toast";

const Index: React.FC = () => {
  const dataoneuser = useSelector(getOneUser);
  const dispatch = useAppDispatch();
  const [editedUser, setEditedUser] = useState(dataoneuser);

  const [hasChanges, setHasChanges] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
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

  const handleStartEdit = (field: string) => {
    setFieldToEdit(field);
    setIsEditMode(true);
  };

  const initialValues = {
    image: null as File | null,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        console.log(values);
        if (!hasChanges) {
          toast.error("No se han realizado cambios. No se puede guardar.");
          return; // No se envía la solicitud si no hay cambios
        }

        dispatch(
          putUser({
            id: editedUser.id,
            name: editedUser.name,
            email: editedUser.email,
            password: editedUser.password,
            image: values.image,
          })
        );
        router.push("/");

        toast.error(
          "¡Se editó correctamente! Recuerde que para que este cambio se haga visible tendrá que volver a iniciar sesión"
        );
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
    setHasChanges(true); // Establece que se han realizado cambios
  };

  return (
    <div className="  h-screen flex flex-col justify-center items-center p-5">
      <div className="w-full  pl-3 ">
        <button
          className="flex absolute  top-3  lg:top-5  text-[30px] lg:text-[35px] items-center"
          onClick={handleGoBack}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </div>

      <div className=" bg-white shadow-lg w-full lg:w-[60vw] rounded-lg">
        <div>
          <EditUser />
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

          <div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default Index;
