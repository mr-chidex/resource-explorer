import React from "react";

const AboutPageIndex = () => {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        About RXplorer
      </h1>

      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        RXplorer is an interactive web application designed for Pokémon fans and
        developers alike. Our mission is to provide a fast, fun, and efficient
        way to explore the vast world of Pokémon data. Built on the powerful
        PokéAPI, RXplorer offers a comprehensive, real-time look at a wide range
        of Pokémon information, from basic stats and types to abilities and
        artwork. Whether you&apos;re a trainer looking for your next team
        member, or a developer seeking reliable data for your next project,
        RXplorer is your ultimate guide.
      </p>

      {/* --- Key Features Section --- */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-12">
        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong className="text-indigo-600 dark:text-indigo-400">
              Infinite Scroll:
            </strong>{" "}
            Browse through the entire Pokémon roster without interruption. Our
            infinite scroll functionality ensures you can explore hundreds of
            Pokémon effortlessly.
          </li>
          <li>
            <strong className="text-indigo-600 dark:text-indigo-400">
              Dynamic Search and Filtering:
            </strong>{" "}
            Quickly find any Pokémon by name using our real-time search, or
            filter the list to see only your favorites.
          </li>
          <li>
            <strong className="text-indigo-600 dark:text-indigo-400">
              Responsive Design:
            </strong>{" "}
            Access RXplorer from any device. Our design adapts to provide a
            great experience on desktops, tablets, and mobile phones.
          </li>
          <li>
            <strong className="text-indigo-600 dark:text-indigo-400">
              Light and Dark Mode:
            </strong>{" "}
            Customize your viewing experience with a simple toggle to switch
            between a light and dark theme.
          </li>
        </ul>
      </div>

      {/* --- Technology Stack Section --- */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="ext-xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          Technology Stack
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          RXplorer is a testament to the power and flexibility of modern web
          development tools. We built this application using the following
          technologies:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong className="text-green-600 dark:text-green-400">
              Next.js:
            </strong>{" "}
            A React framework that enables server-side rendering and static site
            generation for optimal performance and SEO.
          </li>
          <li>
            <strong className="text-yellow-600 dark:text-yellow-400">
              Zustand:
            </strong>{" "}
            A lightweight, fast state management solution for a smooth and
            predictable user experience.
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">SWR:</strong> A
            data-fetching library that provides a seamless, real-time data flow
            with automatic caching and revalidation.
          </li>
          <li>
            <strong className="text-purple-600 dark:text-purple-400">
              React Window:
            </strong>{" "}
            A virtualization library that efficiently renders large lists,
            ensuring high performance even with a huge amount of data.
          </li>
          <li>
            <strong className="text-pink-600 dark:text-pink-400">
              Tailwind CSS:
            </strong>{" "}
            A utility-first CSS framework that allows for rapid UI development
            and a consistent design language.
          </li>
        </ul>
      </div>
    </main>
  );
};

export default AboutPageIndex;
