/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAppSelector } from "@/redux/hook";
import { navLinks } from "@/utils/navLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountPanel } from "../client/AccountPanel";
import { LeftSidebar } from "../client/LeftSidebar";
import { Button } from "../ui/button";
import "../../styles/logo.css"

const Header = () => {
  const location = usePathname();

  const { user, isLoading, token } = useAppSelector((state) => state.auth);

  return (
    <header className="py-3 lg:py-3 border-b sticky top-0 z-50 bg-[#1E1E1E]">
      <div className="layout_container flex justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <LeftSidebar />
          <Link href={"/"} className="text-lg font-bold flex flex-col items-center">
          <div className="logo-container">
          <span className="logo-text">PH Travels</span>
        </div>
          </Link>
        </div>
        <nav className="hidden lg:flex gap-5 items-center ">
          {navLinks.map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              className={`text-lg font-bold text-white hover:text-[#1877F2] ${
                location === nav.path && "font-extrabold underline"
              }`}
            >
              {nav.route}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3 items-center justify-start ">
          {user ? (
            <AccountPanel />
          ) : (
            <Link href="/login" className="relative px-[18px] py-[5px] bg-[#1877F2] text-white rounded-full flex items-center gap-[10px] overflow-hidden">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
