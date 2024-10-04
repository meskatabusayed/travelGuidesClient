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
      className="relative w-[200px] group/premium cursor-pointer"
      onClick={handleSetPremium}
    >
      <div className="p-[3px] bg-primaryMat relative overflow-hidden flex items-center w-full h-[40px] rounded-[8px] z-20">
        <div className="px-[5px] w-full h-full relative z-20 rounded-[5px] flex items-center gap-[20px]">
          <span className="text-white  font-[600]">Premium Only</span>
          <Switch checked={isPremium} className="bg-white" />
        </div>
        {/* <div className="absolute top-0 left-0 position_center w-[220px] h-[220px] avatarGradient z-10 origin-center"></div> */}
      </div>
    </div>
  );
};

export default FilterPremiumContent;