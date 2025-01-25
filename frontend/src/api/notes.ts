import { QueryFunction } from "@tanstack/react-query";
import { axi } from "./useAxios";
import { Note } from "../types-d";


 export const getNotesRequest: QueryFunction<Note[]> = async () => {
  try {
    const response = await axi.get("/notes/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const createNoteRequest = async (data: {
  title: string;
  content: string;
  categories?: number[];
}): Promise<Note> => {
  const response = await axi.post("/notes/create/", data);
  return response.data;
};

export const updateNoteRequest = async (
  id: number,
  data: Partial<Note>
): Promise<Note> => {
  const response = await axi.put(`/notes/update/${id}/`, data);
  return response.data;
};

export const deleteNoteRequest = async (id: number) => {
  await axi.put(`/notes/${id}/delete/`);
};

export const getActiveNotesRequest: QueryFunction<Note[]> = async () => {
  const response = await axi.get("/notes/active/");
  return response.data;
};

export const getArchivedNotesRequest: QueryFunction<Note[]> = async () => {
  const response = await axi.get("/notes/inactive/");
  return response.data;
};

export const archiveNoteRequest = async (id: number) => {
  await axi.put(`/notes/${id}/archive/`);
};

export const addCategoryToNoteRequest = async (noteId: number, categoryId: number) => {
  await axi.post(`/notes/${noteId}/add-category/${categoryId}/`);
};

export const removeCategoryFromNoteRequest = async (noteId: number, categoryId: number) => {
  await axi.delete(`/notes/${noteId}/remove-category/${categoryId}/`);
};
