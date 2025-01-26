import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/types-d";

type State = {
    user: User | null;
    isAuthenticated: boolean;
}

type Actions = {
    setUser: (user: User | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
};


export const useAuthenticationStore = create(
    persist<State & Actions>(
        (set) => ({
            user: null,
            setUser: (user: User | null) => set(() => ({ user })),
            isAuthenticated: false,
            setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
        }),     
        {
            name: "users-storage"
        }
    )
);