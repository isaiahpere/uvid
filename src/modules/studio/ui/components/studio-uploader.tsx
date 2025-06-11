import { Button } from "@/components/ui/button";
import Mux from "@mux/mux-node";
import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: () => void;
}

const MUX_UPLOADER_ID = "video-uploader";

export const StudioUploader = ({
  endpoint,
  onSuccess,
}: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader
        endpoint={endpoint}
        onSuccess={onSuccess}
        id={MUX_UPLOADER_ID}
        className="hidden group/loader"
      />
      <MuxUploaderDrop muxUploader={MUX_UPLOADER_ID} className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-2 rounded-full bg-muted h-32 w-32">
            <UploadIcon className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm">Drag & drop video files to upload</p>
            <p className="text-xs text-muted-foreground">
              Your videos will be private until you publish them
            </p>
          </div>
          <MuxUploaderFileSelect muxUploader={MUX_UPLOADER_ID}>
            <Button type="button" className="rounded-full">
              Select Files
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span slot="separator" className="hidden" />
        <MuxUploaderStatus muxUploader={MUX_UPLOADER_ID} className="text-sm" />
        <MuxUploaderProgress
          muxUploader={MUX_UPLOADER_ID}
          type="percentage"
          className="text-sm"
        />
        <MuxUploaderProgress muxUploader={MUX_UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};
