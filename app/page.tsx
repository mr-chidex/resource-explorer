"use client";

import { Suspense } from "react";
import HomePageIndex from "./sections/home";
import HomeSkeletonLoader from "./components/shared/HomeSkeletonLoader";

const HomePage = () => {
  return (
    <Suspense fallback={<HomeSkeletonLoader />}>
      <HomePageIndex />
    </Suspense>
  );
};

export default HomePage;
