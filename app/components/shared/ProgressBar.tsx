"use client";

import NextTopLoader from "nextjs-toploader";

export default function ProgressBar() {
  return (
    <NextTopLoader
      color="#005c6f"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #00a7ad,0 0 5px #008bba"
    />
  );
}
