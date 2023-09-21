import axios from "axios";
// import { string } from "yup";

export const getallUsersApi = () =>
    axios.get(`/api/v1/dashboard/users`);

export const getoneUserApi = (id: string) =>
    axios.get(`/api/v1/dashboard/users/${id}`)

// export const EditUsersApi = (id: string , role:string) =>
// console.log(id,role)
//     axios.put(`/api/v1/dashboard/users/${id}?role=${role}`);
  
export const EditUsersApi = (id: string, role: string) => {
    console.log("Datos que llegan a EditUsersApi - ID:", id, "Role:", role);
    return axios.patch(`/api/v1/dashboard/users/${id}?role=${role}`);
};

export const DeleteUsersApi = (code: string) =>
    axios.delete(`/api/v1/dashboard/users/${code}`);

