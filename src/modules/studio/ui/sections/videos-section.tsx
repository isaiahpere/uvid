"use client";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

export const VideosSection = () => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor, // cursor is need for useSuspenseInfiniteQuery in typescript suggestions
    }
  ); // must use prefetchInfiniteQuery
  return <div>{JSON.stringify(data)}</div>;
};
