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
import { ListOrderedIcon } from "lucide-react";
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
      <SelectTrigger>
        <ListOrderedIcon className="h-4 w-4" />
        <SelectValue placeholder="Sort Post" />
      </SelectTrigger>
      <SelectGroup className="w-fit">
        <SelectContent>
          <SelectItem value="-upvoteCount">Vote: Highest upvotes</SelectItem>
          <SelectItem value="upvoteCount">Vote: Lowest upvotes</SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SortPost;