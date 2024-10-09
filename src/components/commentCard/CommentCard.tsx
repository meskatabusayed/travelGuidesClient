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
      <AvatarFallback className="bg-[#FF6F61] text-white">
        {user.firstName.charAt(0)}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="bg-[#FFEDD5] rounded-lg p-3">
        <div className="flex flex-col">
          <span className="font-semibold text-[#FF6F61]">
            {user.firstName} {user.lastName}
          </span>
          <span className="font-[400] text-[12px] text-[#6B7280]">
            {format(createdAt, "MMM dd, yyyy")}
          </span>
        </div>
        <p className="mt-3 text-sm text-[#1F2937]">{commentText}</p>
      </div>
      {auth && auth._id === user._id && (
  <div className="flex items-center justify-start gap-[10px] mt-[10px]">
    <div className="text-red-500 hover:text-red-400 transition-colors">
      <CommentDelete comment={comment} setPage={setPage} />
    </div>
    <div className="text-blue-500 hover:text-blue-400 transition-colors">
      <CommentUpdate comment={comment} setPage={setPage} />
    </div>
  </div>
)}
    </div>
  </div>
  
  );
};

export default CommentCard;