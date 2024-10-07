
import { useQuizesStore } from "../store/quizes";

import { Quiz } from "../types-d";
import { authAxios, axi } from "./useAxios";

export const getQuizesRequest = async (): Promise<Quiz[]> => {
    const response = await axi.get<Quiz[]>("/quizes/"); 
  return response.data; }
    

export const createQuizeRequest = async (title: string, description: string) => {
    const response = await authAxios.post("/quizes/", {title, description})
    useQuizesStore.getState().addQuize(response.data);
    return response.data;
};

export const updateQuizeRequest = async (pk: number, title: string, description: string) => {
    const response = await authAxios.put(`quizes/update/${pk}/`, {title, description})
    useQuizesStore.getState().updateQuize(response.data);
    return response.data;
};
