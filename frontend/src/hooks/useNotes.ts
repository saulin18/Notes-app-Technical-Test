import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotesRequest, createNoteRequest } from "../api/notes";
import { useNotesStore } from "../store/notes";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { queryClient } from "../main";

export const useNotes = () => {
  const { 
    notes: storeNotes,
    setNotes,
    selectedCategory,
    setSelectedCategory
  } = useNotesStore();
  
  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", selectedCategory] as const,
    queryFn: ({ queryKey }) => {
      const [, categoryId] = queryKey;
      return getNotesRequest(categoryId);
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const createNoteMutation = useMutation({
    mutationFn: createNoteRequest,
    onSuccess: () => {
      const currentCategory = useNotesStore.getState().selectedCategory;
      queryClient.invalidateQueries({ 
        queryKey: ["notes", currentCategory] 
      });
    },
  });

  useEffect(() => {
    if (!isEqual(notes, storeNotes)) {
      setNotes(notes);
    }
  }, [notes]);

  return {
    notes,
    isLoadingNotes: isLoading,
    notesError: error,
    createNote: createNoteMutation.mutateAsync,
    isCreatingNote: createNoteMutation.isPending,
    selectedCategory,
    setSelectedCategory
  };
};