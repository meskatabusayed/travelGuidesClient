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
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePost: React.FC<IProps> = ({ id, isOpen, setIsOpen }) => {
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild></DialogTrigger>
  <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-xl bg-gradient-to-r from-red-100 via-white to-red-50">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-red-600 font-bold text-xl">
        <AlertTriangle className="h-6 w-6 text-red-600" />
        Confirm Deletion
      </DialogTitle>
      <DialogDescription className="text-gray-700 mt-2 text-sm">
        Are you sure you want to delete this post? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="mt-6 flex justify-between">
      <Button
        variant="destructive"
        className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 ease-in-out rounded-md shadow-sm"
        onClick={handleDeletePost}
      >
        Delete
      </Button>
      <DialogClose asChild>
        <Button
          variant="outline"
          className="px-6 py-2 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 ease-in-out rounded-md"
          id="cancel_post_dialog"
        >
          Cancel
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default DeletePost;