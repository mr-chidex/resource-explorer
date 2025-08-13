"use client";

import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useFavoriteStore } from "@/app/state/useFavoriteStore";
import { fetcher, PokemonListResponse } from "@/app/lib/api";
import LoadingSkeleton from "@/app/components/shared/LoadingSkeleton";
import { PokemonCard } from "@/app/components/pokemon/PokemonCard";

const HomePageIndex = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(search, 500);
  const [isRefetching, setIsRefetching] = useState(false);

  const favorites = useFavoriteStore((state) => state.favorites);
  const [showFavorites, setShowFavorites] = useState(
    searchParams.get("favorites") === "true"
  );

  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;

  const { data, error, mutate, isLoading } = useSWR<PokemonListResponse>(
    url,
    fetcher
  );

  const filteredPokemon = data?.results
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((pokemon) => !showFavorites || favorites.includes(pokemon.name));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleToggleFavorites = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    const params = new URLSearchParams(searchParams.toString());
    if (newShowFavorites) {
      params.set("favorites", "true");
    } else {
      params.delete("favorites");
    }
    router.push(`?${params.toString()}`);
  };

  // Sync state from URL on initial load or navigation
  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setShowFavorites(searchParams.get("favorites") === "true");
  }, [searchParams]);

  const handleRefetch = async () => {
    setIsRefetching(true);
    await mutate();
    setIsRefetching(false);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-slate-800">
        PokéAPI Resource Explorer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-3 py-3 border border-slate-400 outline-none rounded-sm focus:ring-slate-500 focus:border-slate-500"
        />
        <button
          onClick={handleToggleFavorites}
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            showFavorites
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {isLoading || isRefetching ? (
        <LoadingSkeleton />
      ) : !isLoading && error ? (
        <div className="text-red-500 text-center flex flex-col items-center gap-4">
          <p>Failed to load Pokémon. Please try again.</p>
          <button
            disabled={isRefetching}
            onClick={handleRefetch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded w-fit disabled:bg-blue-200"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPokemon?.length === 0 && !isLoading && (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No Pokémon found.
            </div>
          )}
          {filteredPokemon?.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePageIndex;
