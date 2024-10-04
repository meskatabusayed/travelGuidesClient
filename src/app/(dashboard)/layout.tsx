"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Sidebar from "@/components/shared/DashboardSidebar";
import { ThemeProvider } from "@/provider/theme-provider";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";

import Loader from "@/components/shared/Loader";
import Cookies from "js-cookie";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    router.push("/login");
    Cookies.set("redirect", "/dashboard");
    return <></>;
  }
  if (user.role !== "admin") {
    router.push("/");
    return <></>;
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="w-full h-screen flex items-start justify-start pb-[30px] ">
        <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div className="w-full h-full flex-col flex">
          <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full overflow-auto smoothBar p-[50px] ">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;