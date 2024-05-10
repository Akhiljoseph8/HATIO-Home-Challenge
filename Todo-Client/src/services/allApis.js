import { commonApi } from "./commonApi";
import base_url from "./server_url";

export const userRegister = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, "")
}

export const userLogin = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, "")
}
export const projectAdd = async (data) => {
    return await commonApi("POST", `${base_url}/project`, data, "")
}
export const userProject = async (data) => {
    return await commonApi("POST", `${base_url}/getproject`, data, "")
}
export const todoAdd = async (data) => {
    return await commonApi("POST", `${base_url}/todo`, data, "")
}
export const getTodos = async (data) => {
    return await commonApi("POST", `${base_url}/gettodo`, data, "")
}

export const todoUpdate = async (data) => {
    return await commonApi("POST", `${base_url}/update-todo`, data, "")
}

export const todoDelete = async (data) => {
    return await commonApi("POST", `${base_url}/delete-todo`, data, "")
}
export const deleteProject = async (data) => {
    return await commonApi("POST", `${base_url}/delete-project`, data, "")
}

export const database = async () => {
    return await commonApi("GET", `${base_url}/database`)
}
// export const  summary= async (data) => {
//     return await commonApi("POST", `${base_url}/project-summary`, data, "")
// }



