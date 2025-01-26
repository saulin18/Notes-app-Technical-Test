
interface Category {
    id: number;
    name: string;
  }
  
  interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableCategories: Category[];
    onSelectCategory: (categoryId: number) => void;
    isLoading?: boolean;
  }
  
  export function AddCategoryModal({
    isOpen,
    onClose,
    availableCategories,
    onSelectCategory,
    isLoading = false
  }: AddCategoryModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h3 className="text-lg font-bold mb-4">Select a Category</h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                disabled={isLoading}
                className={`px-3 py-1 rounded-full ${
                  isLoading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`mt-4 px-4 py-2 rounded ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {isLoading ? "Processing..." : "Close"}
          </button>
        </div>
      </div>
    );
  }