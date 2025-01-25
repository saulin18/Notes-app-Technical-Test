import { QueryFunction } from "@tanstack/react-query";
import { Category } from "../types-d";
import { axi } from "./useAxios";

export const getCategoriesRequest: QueryFunction<Category[]> = async () => {
    try {
      const response = await axi.get("/notes/category-list/");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  
  export const createCategoryRequest = async (name: string): Promise<Category> => {
    const response = await axi.post("/notes/category-create/", { name });
    return response.data;
  };
  
  export const deleteCategoryRequest = async (id: number) => {
    await axi.put(`/notes/${id}/category-delete/`);
  };