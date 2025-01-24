import { QueryFunction } from "@tanstack/react-query";
import { Category } from "../types-d";
import { authAxios } from "./useAxios";

export const getCategoriesRequest: QueryFunction<Category[]> = async () => {
    const response = await authAxios.get("/notes/category-list/");
    return response.data;
  };
  
  export const createCategoryRequest = async (name: string): Promise<Category> => {
    const response = await authAxios.post("/notes/category-create/", { name });
    return response.data;
  };
  
  export const deleteCategoryRequest = async (id: number) => {
    await authAxios.delete(`/notes/category-delete/${id}/`);
  };