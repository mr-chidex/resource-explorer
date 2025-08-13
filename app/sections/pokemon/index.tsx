"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetcher } from "@/app/lib/api";
import PokemonDetailsSkeleton from "@/app/components/shared/PokemonDetailsSkeleton";
import { FavoriteButton } from "@/app/components/pokemon/FavoriteButton";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

const PokemonDetailsIndex = () => {
  const params = useParams();
  const pokemonName = params.name as string;

  const {
    data: pokemon,
    error,
    isLoading,
  } = useSWR<PokemonDetails>(
    pokemonName ? `https://pokeapi.co/api/v2/pokemon/${pokemonName}` : null,
    fetcher,
  );

  if (isLoading) {
    return <PokemonDetailsSkeleton />;
  }

  if (error || !pokemon) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Pokémon Not Found
          </h2>
          <p className="text-red-600 mb-6">
            Could not load details for {pokemonName}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatStatName = (name: string) => {
    return name.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTypeColor = (typeName: string) => {
    const colors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-200",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
    return colors[typeName] || "bg-gray-400";
  };

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 dark:text-slate-100 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Pokémon List
        </Link>
      </div>

      {/* Pokémon Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              width={192}
              height={192}
              alt={pokemon.name}
              className="w-48 h-48 object-contain"
            />
            <FavoriteButton
              pokemonName={pokemon.name}
              className="absolute top-2 right-2"
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 capitalize">
              {pokemon.name}
            </h1>
            <p className="text-slate-600 mb-4">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>

            {/* Types */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(
                    type.type.name,
                  )}`}
                >
                  {type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)}
                </span>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="text-slate-500">Height</p>
                <p className="font-semibold">{pokemon.height / 10}m</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500">Weight</p>
                <p className="font-semibold">{pokemon.weight / 10}kg</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500">Base Exp</p>
                <p className="font-semibold">{pokemon.base_experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Abilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Base Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div
                key={stat.stat.name}
                className="flex items-center justify-between"
              >
                <span className="text-slate-600 capitalize">
                  {formatStatName(stat.stat.name)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (stat.base_stat / 255) * 100,
                          100,
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-700 w-8 text-right">
                    {stat.base_stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Abilities</h2>
          <div className="space-y-3">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="flex items-center gap-2"
              >
                <span className="text-slate-600 capitalize">
                  {ability.ability.name.replace("-", " ")}
                </span>
                {ability.is_hidden && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Hidden
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shiny Variant */}
      {pokemon.sprites.front_shiny && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Shiny Variant
          </h2>
          <div className="text-center">
            <Image
              src={pokemon.sprites.front_shiny}
              alt={`Shiny ${pokemon.name}`}
              width={128}
              height={128}
              className="w-32 h-32 object-contain mx-auto"
            />
            <p className="text-slate-600 mt-2">
              Shiny{" "}
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetailsIndex;
