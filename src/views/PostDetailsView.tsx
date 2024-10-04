"use client";
import PostCard from "@/components/PostCard/PostCard";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeletons";
import { useGetPostByIdQuery } from "@/redux/features/post/post.api";
const PostDetailsView = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetPostByIdQuery(id);

  if (isLoading) {
    return <PostCardSkeleton />;
  }

  if (!data || (!data.data && !isLoading)) {
    return <div>Post not found</div>;
  }

  return (
    <div className="py-[50px]">
      <PostCard post={data.data} />
    </div>
  );
};

export default PostDetailsView;