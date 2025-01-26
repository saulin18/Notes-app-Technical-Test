import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/api";

export const axi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

