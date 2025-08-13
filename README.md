# RXplorer: The PokéAPI Resource Explorer

RXplorer is a web application designed to be a fast and efficient way to explore Pokémon data from the official PokéAPI. It features an infinite scroll, dynamic search, and a responsive UI with a light/dark mode toggle.

## How to Run

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mr-chidex/resource-explorer
    cd RXplorer
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:3000`.

---

## Architecture and Trade‑offs

The application is built using a modern **Next.js** framework with a client-side state management and data-fetching strategy.

- **Client-Side Data Fetching**: We utilize the **SWR** library for data fetching. While this means the initial page load doesn't contain a full list of Pokémon (requiring a client-side fetch), it provides significant benefits. SWR's caching and revalidation features make subsequent data requests extremely fast, and its infinite scroll capabilities allow for a seamless user experience. The trade-off is a slightly slower initial render compared to server-side rendering all the data at once, but this is a deliberate choice to improve the responsiveness and scalability of the app for a large dataset.

- **Zustand for State Management**: We chose **Zustand** as a lightweight and performant state management solution for simple global states like the theme and favorite Pokémon. It's a pragmatic choice that avoids the boilerplate of larger state management libraries like Redux while still providing robust global state.

- **CSS-in-JS vs. Utility-First**: The project uses **Tailwind CSS**, a utility-first framework, for styling. This allows for rapid development and a consistent design language without writing custom CSS, which is a great trade-off for a solo project.

---

## If I Had More Time

If I had more time, here’s what I'd ship next and why:

1.  **Virtualization with React Window**: While our infinite scroll implementation fetches data efficiently, the browser can still become sluggish as thousands of Pokémon are loaded and rendered into the DOM. Implementing a virtualization library like **React Window** would solve this by only rendering the items that are currently visible within the viewport. This is a crucial performance optimization that would prevent the page from slowing down on large lists, providing a consistently smooth experience.

2.  **Accessibility (a11y) Improvements**: I would conduct a full accessibility audit of the application. This would include ensuring all interactive elements have proper ARIA labels, keyboard navigation is seamless, and color contrasts meet WCAG standards, particularly for the light/dark mode toggle.
