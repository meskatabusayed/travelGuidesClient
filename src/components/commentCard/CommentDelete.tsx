/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useDeteCommentMutation } from "@/redux/features/comment/comment.api";
import { IComment } from "@/types/comment";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface IPorps {
  comment: IComment;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const CommentDelete: React.FC<IPorps> = ({ comment, setPage }) => {
  const { comment: commentText, _id } = comment;

  const [deleteComment, { isError }] = useDeteCommentMutation();

  const handleDeleteComment = async () => {
    const toastId = toast.loading("Please wait");
    const btn = document.getElementById("cancel_comment_dialog");
    try {
      const res = await deleteComment(_id);
      setPage(1);
      const error = res.error as any;
      if (isError || (error && error.status !== 200)) {
        toast.error("Something went wrong");
      } else {
        toast.success("Comment deleted successfully");
      }

      btn?.click();
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Dialog>
  <DialogTrigger asChild>
    <button className="hover:underline text-[#FF6F61] text-[12px] font-semibold">Delete</button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px] p-4 bg-[#FFFFFF] shadow-lg rounded-lg">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-[#FF6F61] font-bold">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        Confirm Deletion
      </DialogTitle>
      <DialogDescription className="text-gray-700">
        Are you sure you want to delete this comment?
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4 rounded-md bg-[#FFEDD5] p-4">
      <p className="text-sm text-[#333]">
        {commentText.length > 100
          ? `${commentText.slice(0, 100)}...`
          : commentText}
      </p>
    </div>
    <DialogFooter className="mt-6 flex justify-between">
      <Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700" onClick={handleDeleteComment}>
        Delete
      </Button>
      <DialogClose asChild>
        <Button variant="outline" className="text-[#FF6F61] border-[#FF6F61] hover:bg-[#FF6F61] hover:text-white" id="cancel_comment_dialog">
          Cancel
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default CommentDelete;