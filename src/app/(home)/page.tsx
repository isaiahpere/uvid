import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { PageClient } from "./client";

const Home = async () => {
  void trpc.hello.prefetch({ text: "Isa" }); // uses useSuspenseQuery internally
  return (
    <div>
      <div>This is where I should load vidos</div>
      <HydrateClient>
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary fallback={<p>Error...</p>}>
            <PageClient />
          </ErrorBoundary>
        </Suspense>
      </HydrateClient>
    </div>
  );
};

export default Home;
