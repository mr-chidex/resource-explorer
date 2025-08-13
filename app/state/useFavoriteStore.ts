import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: string[];
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (name) => get().favorites.includes(name),
      toggleFavorite: (name) => {
        set((state) => {
          const newFavorites = state.isFavorite(name)
            ? state.favorites.filter((favName) => favName !== name)
            : [...state.favorites, name];
          return { favorites: newFavorites };
        });
      },
    }),
    {
      name: "favorites",
    },
  ),
);
