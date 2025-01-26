import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { createNoteRequest, getNotesRequest } from "../api/notes";
import { createCategoryRequest, deleteCategoryRequest, getCategoriesRequest } from "../api/categories";
import { Category } from "../types-d";
import { useNotesStore } from "../store/notes";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { NoteList } from "../components/NotesList";
import { isEqual } from "lodash";
import { queryClient } from "../main";
import { useCategoriesStore } from "../store/categories";
import { CategoryManager } from "../components/CategoryManager";
import { PageHeader } from "../components/PageHeader";
import { CreateNoteModal } from "../components/CreateNoteModal";

const HomePage = () => {
  const { notes, setNotes, selectedCategory, setSelectedCategory } = useNotesStore();
  const { categories, setCategories } = useCategoriesStore();




  const {
    isLoading: isLoadingNotes,
    error: notesError,
    data: notesData = [],
  } = useQuery({
    queryKey: ["notes", selectedCategory] as const,
    queryFn: ({ queryKey }) => getNotesRequest(queryKey),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });


  const { isLoading: isLoadingCategories, data: categoriesData = [] } =
    useQuery<Category[], Error>({
      queryKey: ["categories"],
      queryFn: getCategoriesRequest,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    });

 
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

 
  const [newCategoryName, setNewCategoryName] = useState("");

  
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
            <PageHeader onOpenCreateNote={() => setIsOpen(true)} />
            
          
            <div className="mb-6 flex gap-4 items-center">
              <span className="text-gray-600">Filter by category:</span>
              <select 
                className="border rounded-lg px-4 py-2"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <CategoryManager
              categoriesData={categoriesData}
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              onCreateCategory={handleCreateCategory}
              onDeleteCategory={deleteCategory}
              isLoadingCategories={isLoadingCategories}
            />

            <NoteList notes={notesData || []} />

            <CreateNoteModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title={title}
              content={content}
              noteCategories={noteCategories}
              categoriesData={categoriesData}
              isLoadingCategories={isLoadingCategories}
              setTitle={setTitle}
              setContent={setContent}
              setNoteCategories={setNoteCategories}
              isCreatingNote={isCreatingNote}
              onSubmit={handleSubmitNote}
            />
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default HomePage;
