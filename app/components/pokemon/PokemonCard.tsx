import Link from "next/link";
import { Pokemon } from "@/app/lib/api";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-100 hover:border-blue-200"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold capitalize text-slate-800">
            {pokemon.name}
          </h3>
          <FavoriteButton
            pokemonName={pokemon.name}
            className="flex-shrink-0"
          />
        </div>

        <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
          <span className="text-slate-400 text-sm">Click to view details</span>
        </div>

        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};
