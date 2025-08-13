import React from "react";

const Loader = () => {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="h-10 w-1/2 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="h-10 w-full md:w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-10 w-full md:w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render a number of skeleton cards */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center animate-pulse"
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="flex justify-between w-full mt-4">
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loader;
