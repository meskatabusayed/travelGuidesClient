/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useDebounce from "@/hooks/debounce";
import { setPost } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

import FilterPremiumContent from "./FilterPremiumContent";
import SortPost from "./SortPost";

const FilterBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncevalue = useDebounce(searchValue, 1000);
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", debouncevalue);
    params.set("page", "1");
    dispatch(setPost({ post: [], new: true }));
    router.push(`?${params.toString()}`);
  }, [debouncevalue, router]);

  return (
    <div className="min-w-screen bg-[#1E1E1E] text-white px-6 py-10 flex flex-col items-center">
  
  <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-6 bg-[#142F50] p-6 rounded-lg shadow-md">
   
    <div className="flex-1 md:w-[300px] flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-[#F1C40F]">Search Products</h3>
      <Input
        type="text"
        placeholder="Search for contents..."
        defaultValue={searchParams.get("searchTerm") || ""}
        onChange={(e) => setSearchValue(e.target.value)}
        className="px-4 py-2 bg-[#1E1E1E] text-white border-2 border-[#F1C40F] rounded-md focus:outline-none focus:border-[#FFC107]"
      />
    </div>

    
    <div className="flex-1 md:w-[300px] flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-[#F1C40F]">Sort Posts</h3>
      <SortPost />
    </div>

    
    <div className="flex-1 md:w-[300px] flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-[#F1C40F]">Filter Premium Content</h3>
      <FilterPremiumContent />
    </div>
  </div>
</div>

  );
};

export default FilterBar;
