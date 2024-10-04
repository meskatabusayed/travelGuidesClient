import { useAppSelector } from "@/redux/hook";
import { IComment } from "@/types/comment";
import { format } from "date-fns";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentDelete from "./CommentDelete";
import CommentUpdate from "./CommentUpdate";

interface IPorps {
  comment: IComment;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommentCard: React.FC<IPorps> = ({ comment, setPage }) => {
  const { comment: commentText, user, createdAt } = comment;
  const { user: auth } = useAppSelector((state) => state.auth);
  return (
    <div className="flex space-x-3">
      <Avatar className="w-8 h-8">
        <AvatarImage alt={user.firstName} src={user.image} />
        <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-[#f1f1f1] rounded-lg p-3">
          <div className="flex flex-col">
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <span className="font-[400] text-[12px]">
              {format(createdAt, "MMM dd, yyyy")}
            </span>
          </div>
          <p className="mt-3 text-sm">{commentText}</p>
        </div>
        {auth && auth._id === user._id && (
          <div className="flex items-center justify-start gap-[10px] mt-[10px]">
            <CommentDelete comment={comment} setPage={setPage} />
            <CommentUpdate comment={comment} setPage={setPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;