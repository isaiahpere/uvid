import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrateClient, trpc } from "@/trpc/server";

// we need to use "force-dynamic" to ensure vercel does not consider this page as static.
// This is necessary for prefetching data on the server side using `prefetch`.
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  // prefetch must be accompany with useSuspenseQuery in the client component.
  // prefetch --> HydrateClient --> useSuspenseQuery
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};

export default Page;
