"use client";


import { ThemeProvider } from "@/provider/theme-provider";

import React, { SetStateAction } from "react";



export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <ThemeProvider defaultTheme="light">
    <div className="w-full h-screen flex flex-row items-start justify-start pb-6 bg-gradient-to-b from-gray-100 to-white">
      
      
  
      
      <div className="flex-1 flex flex-col h-full">
      
        
  
       
        <div className="flex-1 overflow-auto p-6 md:p-12 smoothBar bg-white shadow-inner rounded-tl-lg">
          {children}
        </div>
      </div>
    </div>
  </ThemeProvider>
  
  

  
  );
};

export default Layout;