/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeletePostMutation } from "@/redux/features/post/post.api";
import { removePost } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hook";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface IProps {
  id: string;
}

const DeleteCommunityPost: React.FC<IProps> = ({ id }) => {
  const [deletePost, { isError }] = useDeletePostMutation();
  const dispatch = useAppDispatch();
  const handleDeletePost = async () => {
    const toastId = toast.loading("Please wait");
    const btn = document.getElementById("cancel_comment_dialog");
    try {
      const res = await deletePost(id);
      const error = res.error as any;
      if (isError || (error && error.status !== 200)) {
        toast.error("Something went wrong");
      } else {
        toast.success("Comment deleted successfully");
      }
      toast.dismiss(toastId);
      dispatch(removePost(id));
      btn?.click();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white">
      Delete
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px] p-6 bg-white rounded-lg shadow-lg">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-red-600 font-bold">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        Confirm Deletion
      </DialogTitle>
      <DialogDescription className="text-gray-700">
        Are you sure you want to delete this post?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="mt-6 flex justify-between">
      <Button variant="destructive" className="bg-red-600 hover:bg-red-700 transition-colors" onClick={handleDeletePost}>
        Delete
      </Button>
      <DialogClose asChild>
        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors" id="cancel_post_dialog">
          Cancel
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default DeleteCommunityPost;