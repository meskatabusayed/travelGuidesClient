import { ISideBarState } from "@/app/(dashboard)/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";
import ThemeChanger from "./TheamChanger";

const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="w-full flex items-center justify-between px-[20px]  py-[10px] border-b-[1px] border-muted shrink-0">
      <Image
        width={80}
        height={80}
        src="/images/logo.png"
        alt="logo"
        className="w-[80px] md:flex hidden"
      />
      <Button
        className="menuBTn flex md:hidden"
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
      >
        <IoMenu />
      </Button>
      <div className="flex items-center justify-end gap-[8px]">
        <ThemeChanger />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image || ""} alt="user avatar" />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
                  {user?.firstName?.slice(0, 1)}
                  {user?.lastName?.slice(0, 1)}
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/admin/manage-bookings"}>
                Booking Manage
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={"/"}>Setting</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;