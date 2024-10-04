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
import GlobeTalesTooltip from "../shared/GlobeTalesTooltip";
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
      <Avatar>
        <AvatarImage src={user.image} />
        <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[10px]">
        <h4 className="text-sm font-semibold flex items-center gap-[10px]">
          <span>
            {user.firstName} {user.lastName}
          </span>
          {user.isPremium ? (
            <GlobeTalesTooltip message="Verified user">
              <BadgeCheck width={20} className="text-primaryMat" />
            </GlobeTalesTooltip>
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
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-[10px]">
          <h3 className="font-semibold hover:underline cursor-pointer">
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          </h3>
          {user.isPremium ? (
            <GlobeTalesTooltip message="Verified user">
              <BadgeCheck width={20} className="text-primaryMat" />
            </GlobeTalesTooltip>
          ) : (
            ""
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <ProfileCard user={user} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileCard;