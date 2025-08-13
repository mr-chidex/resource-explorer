"use client";

import { useFavoriteStore } from "@/app/state/useFavoriteStore";
import FavoriteIcon from "../icons/FavoriteIcon";

interface FavoriteButtonProps {
  pokemonName: string;
  className?: string;
}

export const FavoriteButton = ({
  pokemonName,
  className = "",
}: FavoriteButtonProps) => {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const favorites = useFavoriteStore((state) => state.favorites);
  const isFavorite = favorites.includes(pokemonName);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemonName);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors hover:bg-gray-100 ${
        isFavorite ? "text-red-500" : "text-gray-400"
      } ${className}`}
    >
      <FavoriteIcon isFavorite={isFavorite} />
    </button>
  );
};
