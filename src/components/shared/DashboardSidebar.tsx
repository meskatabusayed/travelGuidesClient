/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hook";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useEffect } from "react";
import { adminLinks } from "../../routes";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";


type SidebarProps = {
  className?: string;
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsopen,
}: SidebarProps) {
  const dispatch = useAppDispatch();

 
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
     
      const target = event.target as HTMLElement;
      
      const screen = window.screen.width;

     
      if (screen > 1024) {
        return;
      }

     
      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsopen(false);
    };

    
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsopen]);

 /*  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  }; */

  const hanldleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch(logout(undefined));
  };
  const handleCloseBar = () => {
    const width = window.screen.width;

    width > 767 ? "" : setIsopen(false);
  };
  return (
    <aside
  style={{
    transition: "0.4s ease-in-out",
    width: isOpen ? "260px" : "70px",
    display: "flex",
  }}
  className={cn(
    `fixed top-0 left-0 h-screen border-r bg-gradient-to-b from-white to-gray-100 transition-[width] duration-500 md:block
    shrink-0 overflow-hidden z-[9999] sidebar flex flex-col justify-between py-6`,
    className
  )}
>

  <div className="flex items-center justify-between px-4 mb-8">
    <Link href={"/"}>
      <h3 className="font-bold text-xl text-blue-600">
        {isOpen ? "PH Travels" : "PH"}
      </h3>
    </Link>
    <ChevronLeft
      className={cn(
        "cursor-pointer rounded-full border border-gray-300 bg-white p-1 text-xl shadow-sm hover:shadow-md transition-all",
        isOpen ? "rotate-0" : "rotate-180"
      )}
      onClick={() => setIsopen(!isOpen)}
    />
  </div>


  <div className="space-y-6 flex-1 overflow-y-auto px-4">
    <div className="mt-3" onClick={handleCloseBar}>
      <DashboardNav items={adminLinks} />
    </div>
  </div>

  <Button
    onClick={hanldleLogout}
    className={`w-[90%] mx-auto bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-3 shadow transition-all ${
      isOpen ? "block" : "hidden"
    }`}
    variant={"destructive"}
  >
    Logout 
    
  </Button>
</aside>

  
  
  
  );
}