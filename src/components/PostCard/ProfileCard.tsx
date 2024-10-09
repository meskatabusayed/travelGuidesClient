/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "@/redux/features/follower/follower.api";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/user";
import { BadgeCheck, CalendarDays, UserPlus } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { Button } from "../ui/button";
import AllTooltip from "../shared/AllTooltip";
const ProfileCard = ({ user }: { user: TUser }) => {
  const [follow, { isError, isLoading }] = useFollowMutation();
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnFollowMutation();
  const { user: auth } = useAppSelector((state) => state.auth);

  const following = useAppSelector((state) => state.followers.following);

  const isFollowing = following.find(({ user: fol }) => fol._id === user._id);

  const handleFollow = async () => {
    if (!auth) return;
    try {
      const res = await follow(user._id);
      const error = res.error as any;
      if (isError || (error && error.status !== 200)) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-start space-x-4">
     <Avatar className="relative w-12 h-12 rounded-full border-4 border-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transform hover:scale-110 transition duration-300">
  {user.image ? (
    <AvatarImage
      src={user.image}
      className="rounded-full object-cover w-full h-full"
      alt={user.firstName}
    />
  ) : (
    <AvatarFallback className="flex items-center justify-center w-full h-full text-white font-bold text-xl bg-gradient-to-r from-yellow-400 to-pink-500">
      {user.firstName.charAt(0)}
    </AvatarFallback>
  )}
</Avatar>

      <div className="flex flex-col gap-[10px]">
        <h4 className="text-sm font-semibold flex items-center gap-[10px]">
          <span>
            {user.firstName} {user.lastName}
          </span>
          {user.isPremium ? (
            <AllTooltip message="Verified user">
              <BadgeCheck width={20} className="text-[#1877F2]" />
            </AllTooltip>
          ) : (
            ""
          )}
        </h4>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
        {!auth || user._id === auth._id ? (
          ""
        ) : (
          <Button size="sm" onClick={handleFollow}>
            <UserPlus className="mr-2 h-4 w-4" />
            {isFollowing ? "Unfollow" : "Follow"}
            {isLoading || isLoadingUnfollow ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              ""
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export const ProfileHoverCard = ({ user }: { user: TUser }) => {
  return (
    <HoverCard openDelay={200}>
  <HoverCardTrigger asChild>
    <div className="flex items-center gap-[8px]">
      <h3 className="font-semibold cursor-pointer text-gray-800 hover:underline hover:text-blue-500 transition duration-200">
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </h3>
      {user.isPremium && (
        <AllTooltip message="Verified user">
          <BadgeCheck
            width={18}
            className="text-blue-600 hover:scale-110 transition-transform duration-150"
          />
        </AllTooltip>
      )}
    </div>
  </HoverCardTrigger>
  <HoverCardContent className="w-72 bg-white border border-gray-200 shadow-lg p-4 rounded-lg transition duration-200">
    <ProfileCard user={user} />
  </HoverCardContent>
</HoverCard>


  );
};

export default ProfileCard;
