
import { axi } from "./useAxios";
import { Note } from "../types-d";

export const getNotesRequest = async (
  queryKey: readonly ["notes", number | null] 
): Promise<Note[]> => {
  const categoryId = queryKey[1];
  try {
    const response = await axi.get("/notes/filter-by-category/", {
      params: { category_id: categoryId }
    });
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
  if (!data.title || !data.content) {
    throw new Error("Title and content are required");
  }
  const response = await axi.put(`/notes/${id}/update/`, data);
  return response.data;
};

export const deleteNoteRequest = async (id: number) => {
  await axi.put(`/notes/${id}/delete/`);
};


export const archiveNoteRequest = async (id: number) => {
  await axi.put(`/notes/${id}/archive/`);
};

export const unarchiveNoteRequest = async (id: number) => {
  await axi.put(`/notes/${id}/unarchive/`);
};

export const addCategoryToNoteRequest = async (noteId: number, categoryId: number) => {
  await axi.post(`/notes/${noteId}/add-category/${categoryId}/`);
};

export const removeCategoryFromNoteRequest = async (noteId: number, categoryId: number) => {
  await axi.delete(`/notes/${noteId}/remove-category/${categoryId}/`);
};
