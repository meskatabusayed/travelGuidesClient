"use client";
import Loader from "@/components/shared/Loader";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isLoading, user, token } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }
  if (!user || !token) {
    Cookies.set("redirect", "/profile");
    router.push("/");

    return <></>;
  }

  if(user.role === "admin") {
    router.push("/dashboard ");
  }

  return (
    <div className="w-full min-h-screen flex items-start justify-center  py-[50px] bg-gradient-to-r from-orange-500 via-purple-500 to-purple-700 mb-10">
      <div className="min-h-[400px] overflow-auto flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[10px] shadow-md w-full">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;