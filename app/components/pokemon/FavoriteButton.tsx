"use client";

import { useFavoriteStore } from "@/app/state/useFavoriteStore";
import FavoriteIcon from "../icons/FavoriteIcon";

interface FavoriteButtonProps {
  pokemonName: string;
}

export const FavoriteButton = ({ pokemonName }: FavoriteButtonProps) => {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(pokemonName));

  const handleClick = () => {
    toggleFavorite(pokemonName);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        isFavorite ? "text-red-500" : "text-gray-400"
      }`}
    >
      <FavoriteIcon isFavorite={isFavorite} />
    </button>
  );
};
