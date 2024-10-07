import { useAuthStore } from "../store/auth";
import { axi } from "./useAxios";

export const registerRequest = async (username: string, password: string) => {
   const response = await axi.post("https://django-quiz-app-production.up.railway.app/auth/register/", {username, password})
    return response.data;
};

export const loginRequest = async (username: string, password: string) => {
    const response = await axi.post("https://web-production-be9de.up.railway.app/auth/login/", {username, password})
    useAuthStore.getState().setToken(response.data.access, response.data.refresh); 
    return response;
};
