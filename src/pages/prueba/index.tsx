import { ChangeEvent, FormEvent, useState } from 'react';
import Foto from "@/assets/pictures/profile.png"
import Image from 'next/image';
import { useAppDispatch } from '@/states/store';
import { postUser } from '@/states/users/usersSlice';
type Props = {}
const BasicForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null as File | null
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(postUser({ ...formData }))
  };

  // Vista previa de la foto
  const photoPreview = formData.photo ? URL.createObjectURL(formData.photo) : Foto;

  return (
    <div>
      <h1>Formulario Básico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="photo">Foto:</label>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        {photoPreview && (
          <div>
            <h2>Vista Previa de la Foto</h2>
            <div className="relative w-[300px] h-[300px]">
              <Image src={photoPreview} alt="Vista Previa" style={{ maxWidth: "300px" }} layout='fill' />
            </div>
          </div>
        )}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default BasicForm;
