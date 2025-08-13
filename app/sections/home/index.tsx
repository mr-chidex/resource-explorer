"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useFavoriteStore } from "@/app/state/useFavoriteStore";
import LoadingSkeleton from "@/app/components/shared/LoadingSkeleton";
import { PokemonCard } from "@/app/components/pokemon/PokemonCard";
import { useInfinitePokemon } from "@/app/hooks/useInfinitePokemon";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";

const HomePageIndex = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(search, 500);
  const [isRefetching, setIsRefetching] = useState(false);

  const favorites = useFavoriteStore((state) => state.favorites);
  const [showFavorites, setShowFavorites] = useState(
    searchParams.get("favorites") === "true",
  );

  const [setObserveNode, entry] = useIntersectionObserver({
    threshold: 0.1,
  });

  const {
    pokemon: allPokemon,
    error,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    mutate,
  } = useInfinitePokemon(debouncedSearch);

  const filteredPokemon = showFavorites
    ? allPokemon.filter((p) => favorites.includes(p.name))
    : allPokemon;

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

  // To trigger loadMore when the observer's target becomes visible
  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [entry, hasMore, isLoadingMore, loadMore]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
        PokéAPI Resource Explorer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-3 py-3 border bg-white  border-slate-300 outline-none rounded-sm focus:ring-slate-500 focus:border-slate-500"
        />
        <button
          onClick={handleToggleFavorites}
          className={`px-4 py-3 rounded-md font-semibold border bg-white border-slate-300  text-slate-800 transition-colors
            `}
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
            <div className="col-span-full text-center text-slate-600 dark:text-slate-200 text-lg">
              No Pokémon found.
            </div>
          )}
          {filteredPokemon?.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}

      {!isLoading && hasMore && (
        <div ref={setObserveNode} className="text-center mt-16">
          {isLoadingMore ? (
            <div className="text-blue-500 font-semibold">
              Loading more Pokémon...
            </div>
          ) : (
            <div className="text-slate-700 dark:text-slate-100">
              Scroll down to load more
            </div>
          )}
        </div>
      )}
      {!hasMore && !isLoading && (
        <div className="text-center mt-16 text-slate-500 dark:text-slate-300">
          End of Pokémon list.
        </div>
      )}
    </main>
  );
};

export default HomePageIndex;
