"use client";

import { Suspense } from "react";
import LoadingSkeleton from "./components/shared/LoadingSkeleton";
import HomePageIndex from "./sections/home";

const HomePage = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomePageIndex />
    </Suspense>
  );
};

export default HomePage;
