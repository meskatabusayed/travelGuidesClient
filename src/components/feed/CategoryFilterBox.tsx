/* eslint-disable @typescript-eslint/no-unused-vars */
import useDebounce from "@/hooks/debounce";
import {
  useGetAllCategoriesQuery,
  useGetCategoriesByNameQuery,
} from "@/redux/features/category/category.api";
import { setPost } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hook";
import { SquareCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

const CategoryFilterBox = () => {
  const { data } = useGetAllCategoriesQuery({ limit: 6 });

  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("N/A");
  const debouncevalue = useDebounce(searchValue, 500);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const suggestionRef = useRef<HTMLUListElement | null>(null); 

  const { data: sudgestion } = useGetCategoriesByNameQuery(debouncevalue, {
    skip: !isFocused,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const categoriesFromQuery = searchParams.get("category");
    if (categoriesFromQuery) {
      setSelectedCategories(categoriesFromQuery.split(","));
    }
  }, [searchParams]);

  const handleCategoryChange = (id: string) => {
    let updatedCategories;
    dispatch(setPost({ post: [], new: true }));
    if (selectedCategories.includes(id)) {
      updatedCategories = selectedCategories.filter(
        (category) => category !== id
      );
    } else {
      updatedCategories = [...selectedCategories, id];
    }

    setSelectedCategories(updatedCategories);

    const params = new URLSearchParams(searchParams);
    if (updatedCategories.length > 0) {
      params.set("category", updatedCategories.join(","));
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleSlecteCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      return ref.current?.blur();
    }

    handleCategoryChange(id);
    setIsFocused(false); 
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(e.target as Node) &&
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-[#F7F8F9] to-[#E0E7FF] shadow-xl rounded-lg">
  <h3 className="mb-4 text-2xl font-bold text-indigo-700">Categories</h3>

 
  <div className="relative w-full mb-6">
    <div className="flex items-center px-4 py-3 border border-indigo-300 rounded-lg focus-within:ring-4 focus-within:ring-indigo-500 transition-all bg-white">
      <input
        className="w-full bg-transparent outline-none text-indigo-700 placeholder-indigo-400"
        placeholder="Search category..."
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>

    
    {sudgestion?.data && sudgestion?.data.length > 0 && isFocused && (
      <div className="absolute left-0 top-[45px] z-30 w-full bg-white border border-indigo-200 rounded-lg shadow-lg mt-2 overflow-auto max-h-[200px]">
        <ul className="py-2">
          {sudgestion.data.map(({ label, _id }) => (
            <li
              key={_id}
              onClick={() => handleSlecteCategory(_id)}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer flex items-center gap-3 transition-all duration-300"
            >
              <SquareCheck width={15} className="text-indigo-600" />
              <span className="text-gray-800">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  
  <div className="space-y-4">
    {data?.data.map(({ label, _id }) => (
      <div
        onClick={() => handleCategoryChange(_id)}
        className="flex items-center select-none cursor-pointer gap-3 transition-all duration-300 hover:bg-blue-800 px-3 py-2 rounded-lg"
        key={_id + "category"}
      >
        <Checkbox value={_id} checked={selectedCategories.includes(_id)} className="border-indigo-600 checked:bg-indigo-600 checked:border-indigo-600" />
        <span className="text-gray-800 hover:text-indigo-600">{label}</span>
      </div>
    ))}
  </div>
</div>


  );
};

export default CategoryFilterBox;