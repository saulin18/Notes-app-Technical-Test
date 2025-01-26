import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useNotes } from "../hooks/useNotes";
import { useCategories } from "../hooks/useCategories";
import { CategoryManager } from "../components/CategoryManager";
import { NoteList } from "../components/NotesList";
import { PageHeader } from "../components/PageHeader";
import { CreateNoteModal } from "../components/CreateNoteModal";
import Loader from "../components/Loader";
import { useAuthenticationStore } from "../store/users";

const HomePage = () => {

  const { user } = useAuthenticationStore();

  if (!user) return <Navigate to="/auth/login" replace />;

  const {
    notes,
    isLoadingNotes,
    notesError,
    createNote,
    isCreatingNote,
    selectedCategory,
    setSelectedCategory,
  } = useNotes();

  const { categories, isLoadingCategories, createCategory, deleteCategory } =
    useCategories();

  // Local State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteCategories, setNoteCategories] = useState<number[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Handlers
  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreatingNote) return;

    await createNote({ title, content, categories: noteCategories });
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setNoteCategories([]);
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      createCategory(newCategoryName);
      setNewCategoryName("");
    }
  };

  if (isLoadingNotes) return <Loader />;

  if (notesError)
    return (
      <div className="text-center text-2xl font-bold">An error occurred</div>
    );

  return (
    <main className="flex flex-col items-center gap-3 justify-center min-h-dvh w-full bg-[#c1d7ff] pt-10">
      <div className="w-full h-min-h-dvh max-w-6xl">
        <div className="py-8 px-6">
          <PageHeader onOpenCreateNote={() => setIsModalOpen(true)} />

          <div className="mb-6 flex gap-4 items-center">
            <span className="text-gray-600">Filter by category:</span>
            <select
              className="border rounded-lg px-4 py-2"
              value={selectedCategory || ""}
              onChange={(e) =>
                setSelectedCategory(Number(e.target.value) || null)
              }
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
            categoriesData={categories}
            newCategoryName={newCategoryName}
            setNewCategoryName={setNewCategoryName}
            onCreateCategory={handleCreateCategory}
            onDeleteCategory={deleteCategory}
            isLoadingCategories={isLoadingCategories}
          />

          <NoteList notes={notes} />

          <CreateNoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={title}
            content={content}
            noteCategories={noteCategories}
            categoriesData={categories}
            isLoadingCategories={isLoadingCategories}
            setTitle={setTitle}
            setContent={setContent}
            setNoteCategories={setNoteCategories}
            isCreatingNote={isCreatingNote}
            onSubmit={handleCreateNote}
          />
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default HomePage;
