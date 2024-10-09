"use client";

import { useGetAllCategoriesQuery} from "@/redux/features/category/category.api";
import { ICategories } from "@/types/category";
import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";

interface IPorps {
  onChange: (categories: ICategories[]) => void;
}

const CategorySelector: React.FC<IPorps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<ICategories[]>(
    []
  );

  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  
  const { data } = useGetAllCategoriesQuery({ limit: 6 });
  console.log("26" , data);

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

  const filterCategories = data?.data?.filter((category) => {
    return !selectedCategories.some((selectedCategory) => {
      return selectedCategory._id === category._id;
    });
  });

  const handleRemoveCategory = (id: string) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category._id !== id
    );
    setSelectedCategories(updatedCategories);

    onChange(updatedCategories);
  };
  console.log("sd" ,selectedCategories);
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="category">Category</Label>
      <div className="w-full py-[8px] pl-[8px] flex items-center justify-start gap-[10px] border-[1px] border-input">
        {selectedCategories?.map((category) => (
          <button
            key={category._id}
            onClick={() => handleRemoveCategory(category._id)}
            className="w-fit hover:bg-secondary cursor-pointer py-[3px] px-[10px] rounded-md borde-input border-[1px] bg-secondary text-[13px] center gap-[5px] shrink-0"
          >
            {category.label} X
          </button>
        ))}
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            ref={ref}
            className="outline-none border-none bg-transparent w-full"
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {isFocused ? (
            <div
              className="shadow-2xl bg-white w-full absolute z-10 top-[40px] p-[10px] rounded-md"
              ref={suggestionRef}
            >
              {filterCategories?.map((category) => (
                <div
                  key={category._id}
                  className="w-full hover:bg-secondary cursor-pointer py-[5px] px-[10px]"
                  onClick={() => {
                    setValue("");
                    onChange([...selectedCategories, category]);
                    setSelectedCategories([...selectedCategories, category]);
                  }}
                >
                  {category.label}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;