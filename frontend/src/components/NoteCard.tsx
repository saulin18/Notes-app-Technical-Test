import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCategoryToNoteRequest,
  archiveNoteRequest,
  deleteNoteRequest,
  removeCategoryFromNoteRequest,
  unarchiveNoteRequest,
  updateNoteRequest,
} from "../api/notes";
import { useCategoriesStore } from "../store/categories";
import { Category } from "../types/types-d";
import { CategoryList } from "./CategoryList";
import { useState } from "react";
import { EditNoteModal } from "./EditNoteModal";
import { AddCategoryModal } from "./AddCategoryModal";
import { DeleteIcon } from "./DeleteIcon";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

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
  id,
}: NoteCardProps) {
  const { categories: categoriesData } = useCategoriesStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdateNote = (data: { title: string; content: string }) => {
    if (updateMutation.isPending) return;
    updateMutation.mutate(data);
  };

  const updateMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      updateNoteRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setShowEditModal(false);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: archiveNoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const unarchiveMutation = useMutation({
    mutationFn: unarchiveNoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: ({
      noteId,
      categoryId,
    }: {
      noteId: number;
      categoryId: number;
    }) => addCategoryToNoteRequest(noteId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setShowAddModal(false);
    },
  });

  const removeCategoryMutation = useMutation({
    mutationFn: ({
      noteId,
      categoryId,
    }: {
      noteId: number;
      categoryId: number;
    }) => removeCategoryFromNoteRequest(noteId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
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
    <div className="bg-white relative rounded-xl shadow-md p-4 md:p-6 text-gray-800 transition-all duration-200 hover:shadow-lg group">
  <div className="absolute top-3 right-3 flex gap-2">
    <DeleteIcon
      className="size-6 md:size-5 cursor-pointer text-red-500 hover:text-red-700 transition-colors"
      onClick={handleDeleteNote}
    />

    <button
      onClick={() =>
        isArchived ? unarchiveMutation.mutate(id) : archiveMutation.mutate(id)
      }
      className="text-sm px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
    >
      {isArchived ? "Unarchive" : "Archive"}
    </button>
  </div>

  <div className="mb-4 relative">
    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{title}</h3>
    {isArchived && (
      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
        Archived
      </span>
    )}
  </div>

  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
    {content}
  </p>

  <div className="flex flex-col gap-4 justify-between items-start md:items-center">
    <CategoryList
      categories={categoriesList}
      onRemove={handleRemoveCategory}

    />
    
    <div className="flex gap-2 w-full md:w-auto">
      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex items-center justify-center flex-1"
      >
        <PlusIcon className="size-4 mr-2" />
        Category
      </button>
      
      <button
        onClick={() => setShowEditModal(true)}
        className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors flex items-center justify-center flex-1"
      >
        <PencilIcon className="size-4 mr-2" />
        Edit
      </button>
    </div>
  </div>

  {showAddModal && (
    <AddCategoryModal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      availableCategories={availableCategories}
      onSelectCategory={handleAddCategory}
    />
  )}
  
  {showEditModal && (
    <EditNoteModal
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      initialTitle={title}
      initialContent={content}
      onSubmit={handleUpdateNote}
      isSubmitting={updateMutation.isPending}
    />
  )}
</div>
  );
}
