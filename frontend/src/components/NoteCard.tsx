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
import { Category } from "../types-d";
import { CategoryList } from "./CategoryList";
import { useState } from "react";
import { EditNoteModal } from "./EditNoteModal";
import { AddCategoryModal } from "./AddCategoryModal";
import { DeleteIcon } from "./DeleteIcon";

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
    <div className="bg-white relative w-full h-[200px] rounded-lg shadow-lg p-6 text-gray-800 transition-all duration-200 hover:shadow-xl ">
      <DeleteIcon
        className="absolute top-2 right-2 size-5 cursor-pointer text-red-500 hover:text-red-700"
        onClick={handleDeleteNote}
      />

      <button
        onClick={() =>
          isArchived ? unarchiveMutation.mutate(id) : archiveMutation.mutate(id)
        }
        className="absolute top-2 right-10 text-sm px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        {isArchived ? "Unarchive" : "Archive"}
      </button>

      <div className="relative mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        {isArchived && (
          <span className="absolute bottom-7 left-0 bg-gray-700 text-gray-200 px-2 rounded-full text-xs font-semibold">
            Archived
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-2">{content}</p>

      <div className="flex justify-between items-center">
        <CategoryList
          categories={categoriesList}
          onRemove={handleRemoveCategory}
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Add Category
        </button>

        <button
          onClick={() => setShowEditModal(true)}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          Edit
        </button>
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
