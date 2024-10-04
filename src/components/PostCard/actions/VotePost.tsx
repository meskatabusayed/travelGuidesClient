"use client";
import { Button } from "@/components/ui/button";
import { useVotePostMutation } from "@/redux/features/post/post.api";
import { useAppSelector } from "@/redux/hook";
import { IPost, TVoting } from "@/types/post";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => handleVote("upvote")}
        variant={
          votes.upvotes.includes(user?._id || "") ? "secondary" : "ghost"
        }
        size="sm"
      >
        <ChevronUp className="mr-1 h-4 w-4" />
        UPVOTE: {votes.upvotes?.length || 0}
      </Button>
      <Button
        size="sm"
        variant={
          votes.downvotes.includes(user?._id || "") ? "secondary" : "ghost"
        }
        onClick={() => handleVote("downvote")}
      >
        <ChevronDown className="mr-1 h-4 w-4" />
        DOWNVOTE: {votes.downvotes?.length || 0}
      </Button>
    </div>
  );
};

export default VotePost;