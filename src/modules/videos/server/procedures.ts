import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId, // stor userId to include in Mux webhook response
        playback_policies: ["public"],
      },
      cors_origin: "*", // TODO: in production, set to prod URL
    });

    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: "Untitled",
      })
      .returning();

    return { video: video, url: upload.url };
  }),
});
