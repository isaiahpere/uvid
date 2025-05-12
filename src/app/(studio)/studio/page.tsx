import { HydrateClient, trpc } from "@/trpc/server";
import { StudioView } from "@/modules/studio/view/studio-view";
import { DEFAULT_LIMIT } from "@/constants";

const Page = async () => {
  // initial data fetching
  // revalidation happens in studio upload 'useUitls' on success
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;
