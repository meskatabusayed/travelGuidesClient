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
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import CommentCard from "../commentCard/CommentCard";
import GlobeTalesPagination from "../shared/GlobeTalesPagination";
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
      skip: !open, // Skip fetching when the dialog is not open
    }
  );

  const [createComment] = useCreateCommentMutation();

  // Handle new comment creation
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
          <Button size={"sm"} variant="ghost">
            <MessageCircle className="mr-1 h-4 w-4" />
            Comments: {post.commentCount || 0}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] px-[10px]">
        <div className=" h-[80vh] overflow-auto smoothBar w-full">
          <DialogHeader></DialogHeader>
          <Card>
            <PostContent post={post} />
          </Card>
          <Separator />
          <VotePost post={post} />
          <form className="my-6" onSubmit={handleComment}>
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage alt="Your Avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  name="comment"
                  className="w-full min-h-[80px] "
                  required
                  onFocus={(e) => {
                    if (!user) {
                      toast.error("Please login to comment");
                      e.target.blur();
                      return;
                    }
                  }}
                />
                <Button type="submit" className="mt-2">
                  Post Comment
                </Button>
              </div>
            </div>
          </form>

          <h3>{data?.totalDoc || 0} Comments:</h3>
          {data?.data?.map((comment, i) => (
            <CommentCard setPage={setPage} comment={comment} key={i} />
          ))}

          <DialogFooter className="mt-4 flex justify-start w-full">
            <GlobeTalesPagination
              totalDoc={data?.totalDoc || 0}
              className="w-fit"
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
