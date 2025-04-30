"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
  // useSuspenseQuery must go together with prefetch for prefetching to work correctly.
  const [data] = trpc.hello.useSuspenseQuery({ text: "isa" });
  return (
    <div>
      <div>Page Client Component</div>
      <div>{data.greeting}</div>
    </div>
  );
};
