"use client"

import PaymentStatistics from "@/components/sratistics/PaymentStatistics";
import StatisticsHeading from "@/components/sratistics/StatisticsHeading";
import UserStatistics from "@/components/sratistics/UserStatistics";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, {useState } from "react";

import Loader from "@/components/shared/Loader";
import Cookies from "js-cookie";
import Sidebar from "@/components/shared/DashboardSidebar";
const StatisticsView = () => {
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
    <div className="flex h-screen overflow-hidden">
  
  <div
    className={`fixed md:relative h-full bg-[#34b3a0] transition-all duration-300 shadow-lg ${
      isOpen ? "w-64 md:w-72" : "w-16"
    }`}
  >
    <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />
  </div>


  <div
    className={`flex-1 ml-16 md:ml-0 md:pl-${
      isOpen ? "72" : "16"
    } transition-all duration-300 p-4 md:p-6 lg:p-8 bg-gray-100 overflow-auto`}
  >
    
    <StatisticsHeading />

    
    <div className="flex flex-col items-stretch gap-6 mt-6">
      <div className="w-full bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 overflow-hidden">
        <PaymentStatistics />
      </div>
      <div className="w-full bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 overflow-hidden">
        <UserStatistics />
      </div>
    </div>
  </div>
</div>





  
  );
};

export default StatisticsView;