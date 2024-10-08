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
import { useDeleteCategoryMutation } from "@/redux/features/category/category.api";
import { removePost } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hook";
import { AlertTriangle, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface IProps {
  id: string;
}

const DeleteCategory: React.FC<IProps> = ({ id }) => {
  const [deletePost, { isError }] = useDeleteCategoryMutation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleDeletePost = async () => {
    const toastId = toast.loading("Please wait");
    try {
      const res = await deletePost(id);
      const error = res.error as any;
      if (isError || (error && error.status !== 200)) {
        toast.error("Something went wrong");
      } else {
        toast.success("Category deleted successfully");
      }
      toast.dismiss(toastId);
      dispatch(removePost(id));
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
      toast.dismiss(toastId);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-200">
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg p-6">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        Confirm Deletion
      </DialogTitle>
      <DialogDescription className="text-gray-600">
        Are you sure you want to delete it?
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="mt-6 flex justify-between">
      <Button variant="destructive" onClick={handleDeletePost} className="bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-200">
        Delete
      </Button>
      <DialogClose asChild>
        <Button variant="outline" id="cancel_post_dialog" className="text-gray-600 border-gray-300 hover:bg-gray-100 transition-all duration-200">
          Cancel
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default DeleteCategory;