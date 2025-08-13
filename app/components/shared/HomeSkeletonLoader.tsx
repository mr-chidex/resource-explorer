import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const HomeSkeletonLoader = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
        PokéAPI Resource Explorer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full md:w-1/2 px-3 py-3 border bg-white  border-slate-300 outline-none rounded-sm focus:ring-slate-500 focus:border-slate-500"
        />
        <button
          className={`px-4 py-3 rounded-md font-semibold border bg-white border-slate-300  text-slate-800 transition-colors
          `}
        >
          Show Favorites
        </button>
      </div>

      <LoadingSkeleton />
    </main>
  );
};

export default HomeSkeletonLoader;
