"use client"
import { LayoutDashboard, LogOut,  User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

export function AccountPanel() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(undefined));
    Cookies.remove("refreshToken");
  };
  const { user } = useAppSelector((state) => state.auth);

  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 p-1 rounded-full cursor-pointer border-2 border-blue-800 transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden shadow-lg border border-teal-300">
        <Image
          alt="profile"
          src={user?.image || "https://i.ibb.co.com/rF33v54/avater.jpg"}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56 bg-white text-black rounded-lg shadow-xl border border-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
    <DropdownMenuLabel className="px-4 py-2 text-lg font-semibold text-gray-800">
      Account
    </DropdownMenuLabel>
    <DropdownMenuSeparator className="h-[1px] bg-gray-300 mx-2 my-1" />
    <DropdownMenuGroup>
      {user && user.role === "admin" ? (
        <Link href="/dashboard">
          <DropdownMenuItem className="cursor-pointer hover:bg-teal-100 transition-colors duration-200 px-4 py-2 rounded-md">
            <LayoutDashboard className="mr-2 h-4 w-4 text-teal-600" />
            <span className="text-teal-800">Dashboard</span>
          </DropdownMenuItem>
        </Link>
      ) : (
        <>
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer hover:bg-teal-100 transition-colors duration-200 px-4 py-2 rounded-md">
              <User className="mr-2 h-4 w-4 text-cyan-600" />
              <span className="text-cyan-800">Profile</span>
            </DropdownMenuItem>
          </Link>
          
        </>
      )}
    </DropdownMenuGroup>
    <DropdownMenuSeparator className="h-[1px] bg-gray-300 mx-2 my-1" />
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-red-100 transition-colors duration-200 px-4 py-2 rounded-md">
     <span className="text-red-800">Log out</span>
      <LogOut className="mr-2 h-4 w-4 text-red-600" />
      
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  
  
  );
}