"use client";

import { useAppSelector } from "@/redux/hook";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import CreatePostModal from "../PostCreate/CreatePost";
import { Button } from "../ui/button";
import FolowingList from "./FolowingList";
import MyFollowers from "./MyFollowers";
const ContentBar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="w-64 bg-white p-4 hidden lg:block bg-gradient-to-r from-orange-500 via-purple-500 to-purple-700">
      <h2 className="font-semibold mb-4">Seemed Stories</h2>

      {user ? (
        <CreatePostModal />
      ) : (
        <Button
          variant="outline"
          className="w-full mb-4 bg-primaryMat text-white"
          onClick={() => toast.error("Login first to create post")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Your Story
        </Button>
      )}
      <MyFollowers />
      <FolowingList />
    </div>
  );
};

export default ContentBar;