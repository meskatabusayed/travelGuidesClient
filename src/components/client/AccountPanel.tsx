import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

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
        <button className="bg-gradient-to-r from-orange-500 via-purple-500 to-purple-700 center p-[5px] rounded-full cursor-pointer border border-black">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <Image
              alt="profile"
              src={user?.image || "/images/avatar.jpg"}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user && user.role === "admin" ? (
            <Link href="/dashboard" className="cursor-pointer">
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          ) : (
            <>
              <Link href={"/profile"}>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/settings" className="cursor-pointer">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />

                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}