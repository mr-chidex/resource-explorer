import useSWRInfinite from "swr/infinite";
import { fetcher, PokemonListResponse } from "../lib/api";

const PAGE_SIZE = 50; // Load 50 Pokémon at a time

export const useInfinitePokemon = (searchQuery: string = "") => {
  const getKey = (
    pageIndex: number,
    previousPageData: PokemonListResponse | null
  ) => {
    // Reached the end
    if (previousPageData && !previousPageData.next) return null;

    // First page, no previous data
    if (pageIndex === 0) {
      return `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}`;
    }

    // Get the offset from the previous page
    const offset = pageIndex * PAGE_SIZE;
    return `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
  };

  const { data, error, isLoading, size, setSize, isValidating, mutate } =
    useSWRInfinite<PokemonListResponse>(getKey, fetcher, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });

  // Flatten all Pokémon from all pages
  const allPokemon = data ? data.flatMap((page) => page.results) : [];

  // Filter by search query
  const filteredPokemon = searchQuery
    ? allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPokemon;

  // Check if there's more data to load
  const hasMore = data && data[data.length - 1]?.next;

  // Load next page
  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  // Check if we're loading more (not initial load)
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  return {
    pokemon: filteredPokemon,
    error,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    mutate,
    totalLoaded: allPokemon.length,
  };
};
