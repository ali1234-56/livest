import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";

export default function Page() {
  return (
    <div className="h-full p-8 bg-background max-w-screen-2.5xl ">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
};
