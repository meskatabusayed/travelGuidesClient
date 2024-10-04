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
  const suggestionRef = useRef<HTMLUListElement | null>(null); // Ref for the suggestion list

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
    setIsFocused(false); // Close suggestions after selection
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(e.target as Node) &&
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false); // Click outside of input and suggestion list
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <h3 className="mb-2 text-lg font-medium">Categories</h3>
      <div className="px-[10px] border-[1px] border-borderColor rounded-[5px] w-full h-[40px] mb-[20px] relative">
        <input
          className="border-0 border-transparent outline-none w-full h-full"
          placeholder="search category"
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {sudgestion?.data && sudgestion?.data.length > 0 && isFocused && (
          <Card className="absolute left-0 top-[40px] z-10 w-full mt-1 overflow-auto">
            <ul className="py-2" ref={suggestionRef}>
              {sudgestion.data.map(({ label, _id }) => (
                <li
                  key={_id}
                  onClick={() => handleSlecteCategory(_id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[10px]"
                >
                  <SquareCheck width={13} className="text-primary" /> {label}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
      <div className="space-y-2">
        {data?.data.map(({ label, _id }, i) => (
          <div
            onClick={() => handleCategoryChange(_id)}
            className="flex items-center select-none cursor-pointer"
            key={_id + "category"}
          >
            <Checkbox value={_id} checked={selectedCategories.includes(_id)} />
            <span className="ml-2">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterBox;