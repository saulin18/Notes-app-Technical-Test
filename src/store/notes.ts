import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note, Category } from "../types-d";

type State = {
    notes: Note[];  
};

type Actions = {
    setNotes: (notes: Note[]) => void; 
    addNote: (note: Note) => void;  
    updateNote: (note: Note) => void;  
    updateNoteCategories: (note_id: number, categories: Category[]) => void; 
};

export const useNotesStore = create(
    persist<State & Actions>(
        (set) => ({
            notes: [],  
            setNotes: (notes: Note[]) => set(() => ({ notes })),  
            addNote: (note: Note) => set((state) => ({ 
                notes: [...state.notes, note]  
            })),
            updateNote: (note: Note) => set((state) => ({
                notes: state.notes.map((n) =>  
                    n.id === note.id ? note : n
                )
            })),
            updateNoteCategories: (note_id: number, categories: Category[]) => 
                set((state) => ({
                    notes: state.notes.map((n) =>  
                        n.id === note_id ? { ...n, categories } : n
                    ),
                })),
        }),
        {
            name: "notes-storage" 
        }
    )
);


