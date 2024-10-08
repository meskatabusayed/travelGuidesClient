"use client";

import { logout } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";
import { userProfileLinks } from "@/utils/profileSidebarLinks";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
const ProfileSidebar = () => {
  const path = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(undefined));
    Cookies.remove("refreshToken");
  };

  

  return (
    <div className="flex flex-col gap-[15px] w-full md:w-fit">
      
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            href={href}
            key={"profile" + i}
            className={`w-full md:w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] ${
              path === href
                ? "bg-[#1877F2] text-white"
                : "bg-white text-primaryTxt"
            }`}
          >
            <Icon /> {label}
          </Link>
        ))}

      <button
        className="w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] bg-red-600 text-white mt-[50px]"
        onClick={handleLogout}
      >
        <CiLogout /> Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;