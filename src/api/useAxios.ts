import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

console.log(baseURL);

export const axi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});