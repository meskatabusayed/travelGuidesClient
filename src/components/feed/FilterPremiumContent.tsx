"use client";
import { setPost } from "@/redux/features/post/post.slice";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

const FilterPremiumContent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isPremium, setIsPremium] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  const handleSetPremium = async () => {
    if (!user) return toast.error("Please login first");
    if (!user.isPremium) {
      return toast.error("Please buy premium to access premium content");
    }

    if (isPremium) {
      setIsPremium(false);
      router.push("/?premium=");
    } else {
      setIsPremium(true);
      router.push("/?premium=true");
    }

    dispatch(setPost({ post: [], new: true }));
  };

  return (
    <div
  className="relative w-[220px] group/premium cursor-pointer"
  onClick={handleSetPremium}
>
  <div className="p-[3px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 relative overflow-hidden flex items-center w-full h-[45px] rounded-[12px] shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
    <div className="px-[8px] w-full h-full relative z-20 rounded-[8px] flex items-center justify-between gap-[15px] bg-white">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-bold text-lg">
        Premium Only
      </span>
      <Switch
  checked={isPremium}
  className={`relative w-[40px] h-[20px] rounded-full transition-colors duration-300 ease-in-out cursor-pointer 
              ${isPremium ? "bg-green-500" : "bg-gray-300"}`}
>
  <span
    className={`absolute top-1 left-1 w-[18px] h-[18px] rounded-full transition-transform duration-300 ease-in-out 
                ${isPremium ? "transform translate-x-[20px] bg-white shadow-md" : "bg-white"}`}
  />
</Switch>

    </div>
  </div>
</div>

  );
};

export default FilterPremiumContent;