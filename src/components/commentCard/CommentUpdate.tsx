/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCommentMutation } from "@/redux/features/comment/comment.api";
import { IComment } from "@/types/comment";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface IPorps {
  comment: IComment;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommentUpdate: React.FC<IPorps> = ({ comment, setPage }) => {
  const { comment: commentText, _id } = comment;
  const [updateComment, { isError }] = useUpdateCommentMutation();

  const handleUpdateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait");
    const btn = document.getElementById("cancel_comment_update_dialog");
    const form = e.target as HTMLFormElement;
    const comment = form.comment.value as string;
    try {
      const res = await updateComment({ comment, commentId: _id });
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
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:underline text-[12px]">Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5 text-blue-500" />
            Edit Comment
          </DialogTitle>
          <DialogDescription>
            Make changes to your comment below. Click update when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateComment} className="mt-4">
          <Textarea
            defaultValue={commentText}
            placeholder="Edit your comment here..."
            className="min-h-[100px]"
            name="comment"
            required
          />
          <Button type="submit" className="mt-[20px]">
            Update
          </Button>
        </form>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" id="cancel_comment_update_dialog">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentUpdate;