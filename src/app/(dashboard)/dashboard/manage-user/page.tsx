"use client";
import ChangeUserRole from "@/components/manageUser/ChangeUserRole";
import AllTooltip from "@/components/shared/AllTooltip";
import NoDataFound from "@/components/shared/NoDataFound";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetAllUserQuery } from "@/redux/features/auth/user.api";
import { useAppSelector } from "@/redux/hook";
import { formatDistanceToNow } from "date-fns";
import { BadgeCheck, SearchIcon } from "lucide-react";
import { useState } from "react";

const ManageUserView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetAllUserQuery({ searchTerm });
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full p-8 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-md">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-lg text-gray-500">
          Manage user roles and permissions
        </p>
      </div>

    
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <form
          className="flex w-full md:w-[350px] border-b border-gray-300"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            setSearchTerm(form.search.value);
          }}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 text-gray-400 w-auto" />
            </div>
            <Input
              type="search"
              name="search"
              onBlur={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email, name..."
              className="block w-full py-3 pl-10 pr-3 text-sm text-gray-700 bg-white rounded focus:outline-none focus:ring focus:border-blue-400 shadow-sm"
            />
          </div>
          <Button
            type="submit"
            variant="secondary"
            className="ml-3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-md"
          >
            Search
          </Button>
        </form>
      </div>

      {data?.data && data.data.length < 1 ? (
        <div className="w-full text-center py-6">
          <NoDataFound />
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchTerm ? (
          ""
        ) : (
          <Card
            key={user?._id}
            className="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center gap-4 p-6">
              <Avatar className="h-16 w-16 border-2 border-blue-500">
                <AvatarImage
                  src={user?.image}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg text-gray-800">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm text-gray-500">{user?.email}</div>
                <div className="text-sm text-gray-400">
                  Member since{" "}
                  {formatDistanceToNow(
                    new Date(user?.createdAt || "11-11-2022")
                  )}
                </div>
              </div>
            </div>
            <Separator />
            <CardContent className="p-4">
              <Select defaultValue={user?.auth?.role} disabled>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Set Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select role</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {data?.data?.map((pay_user) => (
          <Card
            key={pay_user._id}
            className="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center gap-4 p-6">
              <Avatar className="h-16 w-16 border-2 border-blue-500">
                <AvatarImage
                  src={pay_user.image}
                  alt={`${pay_user.firstName} ${pay_user.lastName}`}
                />
                <AvatarFallback>{pay_user.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-lg text-gray-800">
                    {pay_user.firstName} {pay_user.lastName}
                  </h1>
                  {pay_user.isPremium ? (
                    <AllTooltip message="Verified user">
                      <BadgeCheck width={20} className="text-[#1877F2]" />
                    </AllTooltip>
                  ) : null}
                </div>
                <div className="text-sm text-gray-500">{pay_user.email}</div>
                <div className="text-sm text-gray-400">
                  Member since{" "}
                  {formatDistanceToNow(new Date(pay_user.createdAt))}
                </div>
              </div>
            </div>
            <Separator />
            <CardContent className="p-4">
              <ChangeUserRole
                id={pay_user._id}
                role={pay_user.auth?.role || ""}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageUserView;
