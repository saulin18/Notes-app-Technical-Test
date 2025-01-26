import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategoriesRequest, createCategoryRequest, deleteCategoryRequest } from "../api/categories";
import { useCategoriesStore } from "../store/categories";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { queryClient } from "../main";

export const useCategories = () => {
  const { setCategories } = useCategoriesStore();
  
  const {
    data: categories = [],
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesRequest,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  useEffect(() => {
    if (!isEqual(categories, useCategoriesStore.getState().categories)) {
      setCategories(categories);
    }
  }, [categories]);

  return {
    categories,
    isLoadingCategories: isLoading,
    createCategory: createCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate
  };
};