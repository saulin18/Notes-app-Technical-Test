import { create } from "zustand"
import { persist } from "zustand/middleware"
import { QuizSolution } from "../types-d";

type State = {
    solutions: QuizSolution[];
}

type Actions = {
    setSolutions: (solutions: QuizSolution[]) => void;
    addSolution: (solution: QuizSolution) => void;
    updateSolution: (solution: QuizSolution) => void;
};

export const useSolutionsStore = create(
    persist<State & Actions>(
        (set) => ({
            solutions: [],
            setSolutions: (solutions: QuizSolution[]) => set(() => ({ solutions })),
            addSolution: (solution: QuizSolution) => set((state) => ({ solutions: [...state.solutions, solution] })),
            updateSolution: (solution: QuizSolution) => set((state) => ({ solutions: state.solutions.map((s) => s.id === solution.id ? solution : s) })),
        }),
        {
            name: "solutions"
        }
    )
);