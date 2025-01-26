import { Category } from "../types/types-d";
import { CategoryItem } from "../components/CategoryItem";
import Loader from "../components/Loader";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  noteCategories: number[];
  categoriesData: Category[];
  isLoadingCategories: boolean;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setNoteCategories: React.Dispatch<React.SetStateAction<number[]>>;
  isCreatingNote: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateNoteModal = ({
  isOpen,
  onClose,
  title,
  content,
  noteCategories,
  categoriesData,
  isLoadingCategories,
  setTitle,
  setContent,
  setNoteCategories,
  isCreatingNote,
  onSubmit
}: CreateNoteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Note</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            <label className="block text-sm font-medium mb-2">Select Categories</label>
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
                      setNoteCategories(prev => 
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
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
              onClick={onClose}
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
  );
};