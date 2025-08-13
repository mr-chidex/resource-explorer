import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const PokemonDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <div className="inline-flex items-center text-slate-400">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Pokémon Header Skeleton */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Image Skeleton */}
          <div className="relative">
            <div className="w-48 h-48 bg-slate-200 rounded-lg animate-pulse"></div>
            {/* Favorite Button Skeleton */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
          </div>

          {/* Basic Info Skeleton */}
          <div className="flex-1 text-center md:text-left">
            {/* Name Skeleton */}
            <div className="w-48 h-12 bg-slate-200 rounded mb-2 mx-auto md:mx-0 animate-pulse"></div>
            {/* ID Skeleton */}
            <div className="w-16 h-6 bg-slate-200 rounded mb-4 mx-auto md:mx-0 animate-pulse"></div>

            {/* Types Skeleton */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              <div className="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div>
            </div>

            {/* Stats Summary Skeleton */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-3 bg-slate-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="w-12 h-3 bg-slate-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="w-16 h-3 bg-slate-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Abilities Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base Stats Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-32 h-8 bg-slate-200 rounded mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-200 rounded-full h-2 animate-pulse"></div>
                  <div className="w-8 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-24 h-8 bg-slate-200 rounded mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-32 h-4 bg-slate-200 rounded animate-pulse"></div>
                {index === 1 && (
                  <div className="w-16 h-5 bg-yellow-200 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shiny Variant Skeleton */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <div className="w-32 h-8 bg-slate-200 rounded mb-4 mx-auto animate-pulse"></div>
        <div className="text-center">
          <div className="w-32 h-32 bg-slate-200 rounded-lg mx-auto animate-pulse"></div>
          <div className="w-24 h-4 bg-slate-200 rounded mt-2 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsSkeleton;
