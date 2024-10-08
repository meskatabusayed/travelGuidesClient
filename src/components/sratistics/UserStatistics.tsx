/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { useGetUserStatisticsQuery } from "@/redux/features/statistics/statistics.api";
import { FiUser } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserStarLine } from "react-icons/ri";
import StatisticSkeleton from "../skeletons/StatisticSkeleton";

export const description = "An interactive bar chart";


function UserStatistics() {
  const { data, isLoading } = useGetUserStatisticsQuery(undefined);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const { normalUserCount, premiumUserCount } = data?.data || {};
  const result = [
    {
      name: "Total user",
      value: (normalUserCount || 0) + (premiumUserCount || 0) || 0,
      icon: HiOutlineUserGroup,
    },
    {
      name: "Normal user",
      value: normalUserCount || 0,
      icon: FiUser,
    },
    {
      name: "Verified user",
      value: premiumUserCount || 0,
      icon: RiUserStarLine,
    },
  ];

  if (isLoading) {
    return <StatisticSkeleton />;
  }

  return (
    <div className="w-full p-4">
    <Card className="w-full h-[347px] rounded-lg shadow-lg bg-white border border-gray-200">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-t-lg">
        <div className="flex flex-1 flex-col justify-center px-6 py-5 sm:py-6">
          <CardTitle className="text-xl font-bold">User - Statistics</CardTitle>
          <CardDescription className="text-sm opacity-90 text-white">
            Showing statistics of all users
          </CardDescription>
        </div>
      </CardHeader>
  
      <CardContent className="px-4 py-6 sm:p-6 flex gap-4 justify-between">
        {result.map((item, index) => (
          <div
            key={index}
            className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
          >
            
            <div className="text-xl mt-2">{item.name}</div>
            <div className="text-3xl font-semibold mt-1">{item.value.toFixed(2)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
  
  );
}

export default UserStatistics;