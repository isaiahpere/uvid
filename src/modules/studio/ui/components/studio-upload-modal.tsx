"use client";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ResponsiveModal } from "@/components/responsive-dialog";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created!");
      utils.studio.getMany.invalidate(); // manually invalidate query to refetch data
    },
    onError: (error) => {
      toast.error(
        error.message
          ? `Video Created Failed: ${error.message}`
          : "Video Created Failed"
      );
    },
  });
  return (
    <>
      <ResponsiveModal
        title="Upload Your Video"
        open={!!create.data}
        onOpenChange={() => create.reset()}
      >
        This will be an upload modal
      </ResponsiveModal>
      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>
    </>
  );
};
