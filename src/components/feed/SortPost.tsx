"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setPost } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hook";
import {  ListOrderedIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SortPost = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    dispatch(setPost({ post: [], new: true }));
    router.push(`?${params.toString()}`);
  };
  return (
    <Select onValueChange={handleSort}>
  <SelectTrigger className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2">
    <ListOrderedIcon className="h-5 w-5 text-yellow-300" />
    <SelectValue placeholder="Sort Posts" className="text-white font-medium" />
  </SelectTrigger>
  
  <SelectGroup className="w-fit mt-2">
    <SelectContent className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
      <SelectItem 
        value="-upvoteCount" 
        className="px-6 py-3 text-purple-700 font-semibold hover:bg-purple-50 hover:text-purple-900 transition-all duration-200 ease-in-out"
      >
        🔼 Vote: Highest upvotes
      </SelectItem>
      <SelectItem 
        value="upvoteCount" 
        className="px-6 py-3 text-pink-700 font-semibold hover:bg-pink-50 hover:text-pink-900 transition-all duration-200 ease-in-out"
      >
        🔽 Vote: Lowest upvotes
      </SelectItem>
    </SelectContent>
  </SelectGroup>
</Select>



  );
};

export default SortPost;