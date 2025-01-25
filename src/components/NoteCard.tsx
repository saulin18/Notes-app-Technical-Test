import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategoryToNoteRequest, deleteNoteRequest, removeCategoryFromNoteRequest } from "../api/notes";
import { useCategoriesStore } from "../store/categories";
import { Category } from "../types-d";
import { CategoryList } from "./CategoryList";
import { useState } from "react";

interface NoteCardProps {
  title: string;
  content: string;
  isArchived: boolean;
  categories: number[];
  id: number;

}

export function NoteCard({
  title,
  content,
  isArchived,
  categories,
  id
}: NoteCardProps) {
  const { categories: categoriesData } = useCategoriesStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

 
  const addCategoryMutation = useMutation({
    mutationFn: ({ noteId, categoryId }: { noteId: number; categoryId: number }) => 
      addCategoryToNoteRequest(noteId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setShowAddModal(false);
    }
  });

  const removeCategoryMutation = useMutation({
    mutationFn: ({ noteId, categoryId }: { noteId: number; categoryId: number }) =>
      removeCategoryFromNoteRequest(noteId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

  const handleDeleteNote = () => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(id);
  };

  const handleAddCategory = (categoryId: number) => {
    if (addCategoryMutation.isPending) return;
    addCategoryMutation.mutate({ noteId: id, categoryId });
  };

  const handleRemoveCategory = (categoryId: number) => {
    if (removeCategoryMutation.isPending) return;
    removeCategoryMutation.mutate({ noteId: id, categoryId });
  };
  
 
const categoriesList = categoriesData.filter((category: Category) => 
categories.includes(category.id) 
);

const availableCategories = categoriesData.filter(
  (category: Category) => !categories.includes(category.id)
);

  return (
    <div className="relative w-full h-[200px] rounded-lg shadow-lg p-6 bg-white text-gray-800 transition-all duration-200 hover:shadow-xl">

      <svg 
        onClick={handleDeleteNote}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="absolute top-2 right-2 size-5 cursor-pointer text-red-500 hover:text-red-700"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M6 18 18 6M6 6l12 12" 
        />
      </svg>

      <div className="relative mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        {isArchived && (
          <span className="absolute bottom-7 right-0 bg-gray-700 text-gray-200 px-2 rounded-full text-xs font-semibold">
            Archived
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-2">
        {content}
      </p>

      <div className="flex justify-between items-center">
        <CategoryList categories={categoriesList} onRemove={handleRemoveCategory} />
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Select a Category</h3>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleAddCategory(category.id)}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}