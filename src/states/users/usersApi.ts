import axios from "axios";

export const postUserApi = ({ name, email, password, image }: { name: string, email: string, password: string, image: string }) => axios.post(`/api/auth/register`, {
  name,
  email,
  password,
  image,
});



export const putUserDataApi = async ({ id, name, email, password, image }: { id: string, name: string, email: string, password: string, image: string }) => {
  try {
    const response = await axios.put(`/api/v1/user/${id}`, {
      name,
      id,
      email,
      password,
      image,
    })
    return response;
  } catch (error) {
    throw error;
  }

};



export const changePasswordApi = async (id: string, oldPassword: string, newPassword: string) => {
  try {
    const response = await axios.put(`/api/v1/user/${id}?passwordChange=true`, {
      password: oldPassword,
      newPassword: newPassword,
    });

    return response;
  } catch (error) {
    throw error;
  }
};


export const getorderAPI = async (id: string) => axios.get(`/api/v1/orders?userId=${id}`)

export const orderUserHistoryAPI = async (id: string) => axios.get(`/api/v1/orders?userId=${id}&history=true`)

export const getusername = (id: string) => axios.get(`api/v1/user/${id}`)

