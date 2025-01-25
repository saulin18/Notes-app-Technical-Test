import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { createNoteRequest, getNotesRequest } from "../api/notes";
import { createCategoryRequest, deleteCategoryRequest, getCategoriesRequest } from "../api/categories";
import { Category, Note } from "../types-d";
import { useNotesStore } from "../store/notes";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { NoteList } from "../components/NotesList";
import { isEqual } from "lodash";
import { queryClient } from "../main";
import { useCategoriesStore } from "../store/categories";
import { CategoryItem } from "../components/CategoryItem";

const HomePage = () => {
  const { notes, setNotes } = useNotesStore();
  const { categories, setCategories } = useCategoriesStore();

  // Fetch notes
  const {
    isLoading: isLoadingNotes,
    error: notesError,
    data: notesData = [],
  } = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: getNotesRequest,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Fetch categories
  const { isLoading: isLoadingCategories, data: categoriesData = [] } =
    useQuery<Category[], Error>({
      queryKey: ["categories"],
      queryFn: getCategoriesRequest,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    });

  // Sync stores with query data
  useEffect(() => {
    if (!isEqual(notesData, notes)) {
      setNotes(notesData);
    }
  }, [notesData]);

  useEffect(() => {
    if (!isEqual(categoriesData, categories)) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  // Note creation state
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteCategories, setNoteCategories] = useState<number[]>([]);

  // Category creation state
  const [newCategoryName, setNewCategoryName] = useState("");

  // Mutations
  const { mutate: createNote, isPending: isCreatingNote } = useMutation({
    mutationFn: createNoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsOpen(false);
      setTitle("");
      setContent("");
      setNoteCategories([]);
    },
  });

  const { mutate: createCategory } = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewCategoryName("");
    },
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Handlers
  const handleSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreatingNote) return;
    const data = {
      title,
      content,
      categories: noteCategories,
    };
    createNote(data);
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      createCategory(newCategoryName);
    }
  };

  if (isLoadingNotes) return <Loader />;

  if (notesError)
    return (
      <div className="text-center text-2xl font-bold ">An error occurred</div>
    );

  return (
    <>
      <main className="flex flex-col items-center gap-3 justify-center h-auto w-full bg-[#c1d7ff] pt-10">
        <div className="w-full max-w-6xl">
          <div className="py-8 px-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Note
              </button>
            </div>

            {/* Category Management Section */}
            <div className="mb-12 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New category name"
                    className="flex-1 border p-2 rounded-lg"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button
                    onClick={handleCreateCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create Category
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categoriesData.map((category) => (
                    <div 
                      key={category.id} 
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                    >
                      <span className="mr-2">{category.name}</span>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete category"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes List */}
            <NoteList notes={notesData || []} />

            {/* Create Note Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Create New Note
                  </h2>
                  <form onSubmit={handleSubmitNote} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Title"
                      className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <textarea
                      placeholder="Content"
                      className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Select Categories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {isLoadingCategories ? (
                          <Loader />
                        ) : (
                          categoriesData.map((category) => (
                            <CategoryItem
                              key={category.id}
                              id={category.id}
                              name={category.name}
                              onClick={() => {
                                setNoteCategories((prev) =>
                                  prev.includes(category.id)
                                    ? prev.filter((id) => id !== category.id)
                                    : [...prev, category.id]
                                );
                              }}
                              isSelected={noteCategories.includes(category.id)}
                            />
                          ))
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        disabled={isCreatingNote}
                      >
                        {isCreatingNote ? "Creating..." : "Create Note"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default HomePage;