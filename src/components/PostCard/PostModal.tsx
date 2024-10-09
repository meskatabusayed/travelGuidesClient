/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@/redux/features/comment/comment.api";
import { useAppSelector } from "@/redux/hook";
import { IComment } from "@/types/comment";
import { IPost } from "@/types/post";
import { FaCommentDots } from "react-icons/fa";
import React, { useState } from "react";
import { toast } from "sonner";
import CommentCard from "../commentCard/CommentCard";

import CommentCardSkeleton from "../skeletons/CommentCardSkeleton";
import PostCardSkeleton from "../skeletons/PostCardSkeletons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import PostContent from "./PostContent";
import VotePost from "./actions/VotePost";

interface IPorps {
  post: IPost;
  trigger?: React.ReactNode;
}

const PostModal: React.FC<IPorps> = ({ post, trigger }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<IComment[]>([]);

  const { user } = useAppSelector((state) => state.auth);

  const {
    data = { data: [], totalDoc: 0 },
    isFetching,
    isLoading,
  } = useGetCommentsByPostIdQuery(
    {
      postId: post._id,
      page,
    },
    {
      skip: !open, 
    }
  );

  const [createComment] = useCreateCommentMutation();

  
  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    const toastId = toast.loading("Please wait");

    try {
      const form = e.target as HTMLFormElement;
      const comment = form.comment.value;
      if (!comment) return;
      await createComment({ comment, postId: post._id });
      form.reset();
      toast.dismiss(toastId);
      toast.success("Comment created successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  };

  if (isLoading)
    return (
      <Dialog open={isLoading}>
        <DialogTrigger>
          <Skeleton />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[850px] px-[10px]">
          <div className=" h-[80vh] overflow-auto smoothBar w-full">
            <DialogHeader></DialogHeader>
            <Card>
              <PostCardSkeleton />
            </Card>
            <Separator />

            <form className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <PostCardSkeleton />
                </div>
              </div>
            </form>

            <CommentCardSkeleton />

            <DialogFooter></DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    {trigger ? (
      trigger
    ) : (
      <Button size={"sm"} variant="ghost" className="flex items-center bg-[#FF6F61] text-white hover:bg-[#FF4A4A] transition-colors">
        <FaCommentDots className="mr-1 h-4 w-4" />
        Comments: {post.commentCount || 0}
      </Button>
    )}
  </DialogTrigger>
  
  <DialogContent className="sm:max-w-[850px] px-4 py-6 bg-[#F9F9F9] rounded-lg shadow-lg">
    <div className="h-[80vh] overflow-auto smoothBar w-full">
      <DialogHeader>
        <h2 className="text-lg font-bold text-[#FF6F61]">Comments</h2>
      </DialogHeader>
      
      <Card className="my-4 shadow-md border border-[#E5E5E5] rounded-lg p-4 bg-white">
        <PostContent post={post} />
      </Card>
      
      <Separator className="my-4" />
      
      <VotePost post={post} />
      
      <form className="my-6" onSubmit={handleComment}>
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage alt="Your Avatar" src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-[#FF6F61] text-white">YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              name="comment"
              className="w-full min-h-[80px] border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F61] transition-colors"
              required
              onFocus={(e) => {
                if (!user) {
                  toast.error("Please login to comment");
                  e.target.blur();
                  return;
                }
              }}
            />
            <Button type="submit" className="mt-2 bg-[#1877F2] text-white hover:bg-[#0E5BB5] transition-colors">
              Comment
            </Button>
          </div>
        </div>
      </form>

      <h3 className="text-lg font-bold text-[#333333]">{data?.totalDoc || 0} Comments:</h3>
      {data?.data?.map((comment, i) => (
        <CommentCard setPage={setPage} comment={comment} key={i} />
      ))}
    </div>
  </DialogContent>
</Dialog>

  );
};

export default PostModal;
