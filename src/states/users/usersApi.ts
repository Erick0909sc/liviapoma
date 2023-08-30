import axios from "axios";

export const postUserApi = ({ name, email, password, image }: { name: string, email: string, password: string, image: string }) => axios.post(`/api/v1/auth/register`, {
  name,
  email,
  password,
  image,
});
