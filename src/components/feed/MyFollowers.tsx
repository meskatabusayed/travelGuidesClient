"use client";
import { useGetFollwersQuery } from "@/redux/features/follower/follower.api";
import { setFollowers } from "@/redux/features/follower/follower.slice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const MyFollowers = ({ heading = true }: { heading?: boolean }) => {
  const { data } = useGetFollwersQuery(undefined);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.data) {
      dispatch(setFollowers(data.data));
    }
  }, [data, dispatch]);

  return (
    <div>
      {heading ? <h2 className="font-semibold my-4">Followers</h2> : ""}

      {data?.data?.map(({ follower }) => (
        <div
          key={follower._id}
          className="flex items-center mb-2 w-full p-[10px] border-[1px] border-input rounded-[8px]"
        >
          <Avatar className="w-[35px] h-[35px] mr-2">
            <AvatarImage
              src={follower.image}
              alt={follower.firstName}
              className="border-[1px] border-input overflow-hidden"
            />
            <AvatarFallback>{follower.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-[12px] font-[600]">
            {follower.firstName} {follower.lastName}
          </span>
        </div>
      ))}

      {data?.data && data?.data?.length < 1 ? (
        <div>
          <p className="text-center text-[17px] font-[700]">No Follower</p>
          <p className="text-center text-[14px]">
            Upload your adventure post on newsfeed reach more followers
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyFollowers;