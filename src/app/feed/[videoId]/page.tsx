interface VideoIdPageProps {
  params: Promise<{ videoId: string }>;
}

const VideoIdPage = async ({ params }: VideoIdPageProps) => {
  const { videoId } = await params;
  return <p>Video Id : {videoId}</p>;
};

export default VideoIdPage;
