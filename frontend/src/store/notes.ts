import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "../types-d";

type State = {
    notes: Note[];
    selectedCategory: number | null; 
};

type Actions = {
    setNotes: (notes: Note[]) => void; 
    addNote: (note: Note) => void;  
    updateNote: (note: Note) => void;
    setSelectedCategory: (categoryId: number | null) => void;
};

export const useNotesStore = create(
    persist<State & Actions>(
        (set) => ({
            notes: [],  
            selectedCategory: null,
            setNotes: (notes: Note[]) => set(() => ({ notes })),  
            addNote: (note: Note) => set((state) => ({ 
                notes: [...state.notes, note]  
            })),
            updateNote: (note: Note) => set((state) => ({
                notes: state.notes.map((n) =>  
                    n.id === note.id ? note : n
                )
            })),
            setSelectedCategory: (categoryId: number | null) => set({ selectedCategory: categoryId })
        }),
        {
            name: "notes-store",
        }
    )
);

