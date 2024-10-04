"use client";
import {
  useGetFollowingListQuery,
  useUnFollowMutation,
} from "@/redux/features/follower/follower.api";
import { setFollowing } from "@/redux/features/follower/follower.slice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const FolowingList = ({ heading = true }: { heading?: boolean }) => {
  const { data } = useGetFollowingListQuery(undefined);

  const [unFollow, { isLoading }] = useUnFollowMutation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.data) {
      dispatch(setFollowing(data.data));
    }
  }, [data, dispatch]);

  const handleUnFollow = async (id: string) => {
    await unFollow(id);
  };

  return (
    <div>
      {heading ? <h2 className="font-semibold my-4">Following</h2> : ""}

      {data?.data?.map(({ user }) => (
        <div key={user._id} className="flex items-center mb-2 w-full">
          <Avatar className="w-[45px] h-[45px] mr-2">
            <AvatarImage
              src={user.image}
              alt={user.firstName}
              className="border-[1px] border-input overflow-hidden"
            />
            <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-[0px] justify-start items-start">
            <span className="text-[14px] font-[600]">
              {user.firstName} {user.lastName}
            </span>
            <button
              className="text-[12px] underline hover:italic"
              onClick={() => handleUnFollow(user._id)}
            >
              Unfollow
              {isLoading ? <ImSpinner2 className="animate-spin" /> : ""}
            </button>
          </div>
        </div>
      ))}

      {data?.data && data?.data?.length < 1 ? (
        <div>
          <p className="text-center text-[17px] font-[700]">No Following</p>
          <p className="text-center text-[14px]">
            Explore more content on news feed and follow other to get connected
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FolowingList;