import { useAuthStore } from "../store/auth";
import { axi } from "./useAxios";


export const registerRequest = async (username: string, password: string) => {
    try {
         const response = await axi.post("/auth/register/", {username, password})
    return response.data;} catch (error) {
        console.log(error);
    }
  
    
};


export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axi.post('/auth/login/', { username, password });
        // Guarda los tokens en el estado de autenticación
        useAuthStore.getState().setToken(response.data.access, response.data.refresh);
        return response.data;
    } catch (error) {
        console.error("Error en loginRequest:", error);
        throw error; // Lanza el error para manejarlo en otro lugar
    }
};
