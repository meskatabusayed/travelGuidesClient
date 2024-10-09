/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import { IPost } from "@/types/post";
import { EllipsisVertical, Eye, Share2, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import DeletePost from "./actions/DeletePost";
import DownloadPdf from "./actions/DownloadPdf";
const PostOptions = ({ post }: { post: IPost }) => {
  const { user } = useAppSelector((state) => state.auth);
  const isAuthor = user && post.user?._id === user._id;
  const [_, copy] = useCopyToClipboard();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleShare = async () => {
    const url = window.location.origin;
    await copy(url + "/post/" + post._id);
    toast.success("Shareable Link copied to clipboard");
  };

  return (
    <>
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition duration-200">
      <EllipsisVertical width={15} className="text-gray-600" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg border border-gray-200">
    <DropdownMenuLabel className="font-bold text-lg text-gray-800 p-2">Options</DropdownMenuLabel>
    <DropdownMenuSeparator className="bg-gray-200" />
    <DropdownMenuGroup>
      <DropdownMenuItem
        onClick={handleShare}
        className="flex items-center gap-[5px] p-2 hover:bg-blue-100 transition-colors rounded-md"
      >
        <Share2 width={15} className="text-blue-600" />
        <span className="text-gray-800">Share</span>
      </DropdownMenuItem>

      <Link href={`/post/${post._id}`} passHref>
        <DropdownMenuItem className="flex items-center gap-[5px] p-2 hover:bg-green-100 transition-colors rounded-md">
          <Eye width={15} className="text-green-600" />
          <span className="text-gray-800">View Post</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuItem className="flex items-center gap-[5px] p-2 hover:bg-yellow-100 transition-colors rounded-md">
        <DownloadPdf id={post._id} />
        <span className="text-gray-800"></span>
      </DropdownMenuItem>

      {isAuthor && (
  <DropdownMenuItem
    className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
    onClick={() => setOpenDeleteModal(true)}
  >
    <Trash width={15} className="text-red-500 transition-colors duration-200 group-hover:text-red-700" />
    <span className="text-gray-700 group-hover:text-red-700 font-semibold">
      Delete
    </span>
  </DropdownMenuItem>
)}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
<DeletePost
  id={post._id}
  isOpen={openDeleteModal}
  setIsOpen={setOpenDeleteModal}
/>

    </>
  );
};

export default PostOptions;