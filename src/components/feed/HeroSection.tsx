/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  time: string;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

interface Event {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface Group {
  id: number;
  name: string;
  avatar: string;
}

export default function SquareSocialMedia() {
  return (
    <div className="flex h-full bg-gray-100">
      {/* Left Sidebar */}

      {/* Main Content */}

      {/* Right Sidebar */}
    </div>
  );
}