import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { Token } from "../types-d";

function logout() {
    useAuthStore.getState().logout()
    window.location.href = '/auth/login'
}

const baseURL = import.meta.env.VITE_BACKEND_URL

export const axi = axios.create({
    baseURL
});

export const authAxios = axios.create({
    baseURL,
    withCredentials: true
});


authAxios.interceptors.request.use(async (config) => {
    const accessToken: string = useAuthStore.getState().access;
    const refreshToken: string = useAuthStore.getState().refresh;

    
    config.headers = {
        Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;

   
    const tokenDecoded: Token = jwtDecode(accessToken);
    const expiration = new Date(tokenDecoded.exp * 1000 - 1000 * 60 * 10);
    const now = new Date();
    const tenMinutes = 1000 * 60 * 10;

    
    if (expiration.getTime() - now.getTime() < tenMinutes) {
        try {
            const response = await axi.post('/auth/refresh/', { refresh: refreshToken });
            
            useAuthStore.getState().setToken(response.data.access, response.data.refresh);
        } catch (err) {
            console.error("Error al refrescar el token:", err);
            logout();
        }
    }

    return config;
});