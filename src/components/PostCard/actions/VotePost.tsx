"use client";
import { Button } from "@/components/ui/button";
import { useVotePostMutation } from "@/redux/features/post/post.api";
import { useAppSelector } from "@/redux/hook";
import { IPost, TVoting } from "@/types/post";
import { useState } from "react";
import { toast } from "sonner";
import { AiFillLike , AiFillDislike } from "react-icons/ai";
const VotePost = ({ post }: { post: IPost }) => {
  const [votePost] = useVotePostMutation();

  const { user } = useAppSelector((state) => state.auth);
  const [votes, setVotes] = useState({
    upvotes: post.upvotes,
    downvotes: post.downvotes,
  });
  const handleVote = async (vote: TVoting) => {
    if (!user) {
      return toast.error("Please Login to vote");
    }

    if (vote === "downvote") {
      if (votes.downvotes.includes(user._id)) {
        const downvotes = [...votes.downvotes].filter((v) => v !== user._id);
        setVotes((v) => ({ ...v, downvotes }));
      } else {
        const downvotes = [...votes.downvotes, user._id];
        const upvotes = [...votes.upvotes].filter((v) => v !== user._id);
        setVotes({ upvotes, downvotes });
      }
    } else {
      if (votes.upvotes.includes(user._id)) {
        const upvotes = [...votes.upvotes].filter((v) => v !== user._id);
        setVotes((v) => ({ ...v, upvotes }));
      } else {
        const upvotes = [...votes.upvotes, user._id];
        const downvotes = [...votes.downvotes].filter((v) => v !== user._id);

        setVotes({ downvotes, upvotes });
      }
    }

    await votePost({ postId: post._id, vote });
  };
  return (
    <div className="flex items-center space-x-4">
  <Button
    onClick={() => handleVote("upvote")}
    variant={
      votes.upvotes.includes(user?._id || "") ? "secondary" : "ghost"
    }
    size="sm"
    className={`flex items-center space-x-1 transition duration-300 ${
      votes.upvotes.includes(user?._id || "") ? "bg-green-600 text-white" : "bg-white text-green-600 border border-green-600 hover:bg-green-100"
    }`}
  >
    <AiFillLike className="h-4 w-4" />
    <span>UPVOTE: {votes.upvotes?.length || 0}</span>
  </Button>
  <Button
    size="sm"
    variant={
      votes.downvotes.includes(user?._id || "") ? "secondary" : "ghost"
    }
    onClick={() => handleVote("downvote")}
    className={`flex items-center space-x-1 transition duration-300 ${
      votes.downvotes.includes(user?._id || "") ? "bg-red-600 text-white" : "bg-white text-red-600 border border-red-600 hover:bg-red-100"
    }`}
  >
    <AiFillDislike className="h-4 w-4" />
    <span>DOWNVOTE: {votes.downvotes?.length || 0}</span>
  </Button>
</div>

  );
};

export default VotePost;