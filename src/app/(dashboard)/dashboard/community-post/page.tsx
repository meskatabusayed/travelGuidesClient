//community post..
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DeleteCommunityPost from "@/components/ManageCommunityPost/ManageCommunityPost";
import PostCard from "@/components/PostCard/PostCard";
import PostModal from "@/components/PostCard/PostModal";

import { Button } from "@/components/ui/button";
import { useGetAllPostQuery } from "@/redux/features/post/post.api";
import { useState } from "react";
const CommunityPostView = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetAllPostQuery({
    page,
    limit: 100,
  });
  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-md">
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {data?.data?.map((post, i) => (
      <PostCard
        className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        post={post}
        key={post._id}
        showFooterItems={false}
      >
        <div className="flex gap-4 w-full mt-4 p-4 border-t border-gray-200">
          <DeleteCommunityPost id={post._id} />
          <PostModal
            post={post}
            trigger={
              <Button className="w-full" variant={"secondary"}>
                View Post
              </Button>
            }
          />
        </div>
      </PostCard>
    ))}
  </div>
</div>

  );
};

export default CommunityPostView;
