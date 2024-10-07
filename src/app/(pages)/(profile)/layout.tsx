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
    <div className="w-full min-h-screen flex items-start justify-center py-[50px] bg-gradient-to-bl from-[#00c9a7] via-[#3a86ff] to-[#8338ec] mb-10">
  <div className="min-h-[400px] w-full flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[12px] shadow-2xl bg-[#f7f9fc] border border-[#e2e8f0] overflow-hidden">
    <ProfileSidebar />
    <div className="flex-1 p-5 md:p-8 rounded-lg bg-[#ffffff] shadow-inner transition-all duration-300 ease-in-out hover:shadow-lg">
      {children}
    </div>
  </div>
</div>

  );
};

export default Layout;