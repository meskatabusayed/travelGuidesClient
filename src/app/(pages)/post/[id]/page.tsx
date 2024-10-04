import PostDetailsView from "@/views/PostDetailsView";

const page = ({ params }: { params: { id: string } }) => {
  return <PostDetailsView id={params.id} />;
};

export default page;