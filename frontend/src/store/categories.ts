import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category } from "../types/types-d";

type State = {
    categories: Category[];
}

type Actions = {
    setCategories: (categories: Category[]) => void;
    addCategory: (category: Category) => void;
    deleteCategory: (categoryId: number) => void; 
};

export const useCategoriesStore = create(
    persist<State & Actions>(
        (set) => ({
            categories: [],
            setCategories: (categories: Category[]) => set(() => ({ categories })),
            addCategory: (category: Category) => set((state) => ({ 
                categories: [...state.categories, category] 
            })),
            deleteCategory: (categoryId: number) => set((state) => ({
                categories: state.categories.filter((c) => c.id !== categoryId)
            })),
        }),
        {
            name: "categories-storage"
        }
    )
);
