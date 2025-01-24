import { QueryFunction } from "@tanstack/react-query";
import { authAxios, axi } from "./useAxios";
import { Note } from "../types-d";


 export const getNotesRequest: QueryFunction<Note[]> = async () => {
  debugger
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
  const response = await authAxios.post("/notes/create/", data);
  return response.data;
};

export const updateNoteRequest = async (
  id: number,
  data: Partial<Note>
): Promise<Note> => {
  const response = await authAxios.put(`/notes/update/${id}/`, data);
  return response.data;
};

export const deleteNoteRequest = async (id: number) => {
  await authAxios.delete(`/notes/delete/${id}/`);
};

export const getActiveNotesRequest: QueryFunction<Note[]> = async () => {
  const response = await authAxios.get("/notes/active/");
  return response.data;
};

export const getArchivedNotesRequest: QueryFunction<Note[]> = async () => {
  const response = await authAxios.get("/notes/inactive/");
  return response.data;
};

export const archiveNoteRequest = async (id: number) => {
  await authAxios.put(`/notes/${id}/archive/`);
};

export const addCategoryToNoteRequest = async (
  noteId: number,
  categoryId: number
) => {
  await authAxios.post(`/notes/add-category-to-note/${noteId}/${categoryId}/`);
};

export const removeCategoryFromNoteRequest = async (
  noteId: number,
  categoryId: number
) => {
  await authAxios.delete(
    `/notes/remove-category-from-note/${noteId}/${categoryId}/`
  );
};
