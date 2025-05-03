"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
  // useSuspenseQuery must go together with prefetch in server component.
  const [data] = trpc.hello.useSuspenseQuery({ text: "isa" });
  return (
    <div>
      <div>Page client says: {data.greeting}</div>
    </div>
  );
};
