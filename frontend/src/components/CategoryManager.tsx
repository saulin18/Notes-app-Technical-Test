import { Category } from "../types/types-d";
import Loader from "../components/Loader";
import { useState } from "react";

interface CategoryManagerProps {
  categoriesData: Category[];
  newCategoryName: string;
  setNewCategoryName: (value: string) => void;
  onCreateCategory: () => void;
  onDeleteCategory: (id: number) => void;
  isLoadingCategories: boolean;
}

export const CategoryManager = ({
  categoriesData,
  newCategoryName,
  setNewCategoryName,
  onCreateCategory,
  onDeleteCategory,
  isLoadingCategories
}: CategoryManagerProps) => {
  const [showNameError, setShowNameError] = useState(false);

  const handleCreate = () => {
    if (!newCategoryName.trim()) {
      setShowNameError(true);
      return;
    }
    setShowNameError(false);
    onCreateCategory();
  };

  return (
    <div className="mb-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="New category name"
              className={`flex-1 border p-2 rounded-lg ${
                showNameError ? "border-red-500" : ""
              }`}
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                setShowNameError(false);
              }}
            />
            <button
              onClick={handleCreate}
              className="bg-green-600 text-sm text-white p-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create Category
            </button>
          </div>
          
          {showNameError && (
            <p className="text-red-500 text-sm -mt-2">
              Category name cannot be empty
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {isLoadingCategories ? (
            <Loader />
          ) : (
            categoriesData.map((category) => (
              <div 
                key={category.id} 
                className="flex items-center bg-gray-100 rounded-full px-3 py-1"
              >
                <span className="mr-2">{category.name}</span>
                <button
                  onClick={() => onDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete category"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};