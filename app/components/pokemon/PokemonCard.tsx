import Link from "next/link";
import { Pokemon } from "@/app/lib/api";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const id = pokemon.url.split("/").slice(-2, -1)[0];

  return (
    <div className="flex items-center justify-between px-4 py-8 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/pokemon/${id}`} className="flex-grow">
        <h3 className="text-lg font-semibold capitalize text-blue-600 hover:underline">
          {pokemon.name}
        </h3>
      </Link>
      <FavoriteButton pokemonName={pokemon.name} />
    </div>
  );
};
