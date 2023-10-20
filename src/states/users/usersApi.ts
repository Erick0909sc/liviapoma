import axios from "axios";

export const postUserApi = ({ name, email, password, image }: { name: string, email: string, password: string, image: string }) => axios.post(`/api/auth/register`, {
  name,
  email,
  password,
  image,
});



export const putUserDataApi = ({ id, name, email, password, image }: { id: string, name: string, email: string, password: string, image: string }) => {
  console.log("Datos que se enviarán a la API:", { id, name, email, password, image });

  return axios.put(`api/v1/user/${id}`, {
    name,
    id,
    email,
    password,
    image,
  });
};

