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
    <div className="sidebar-container">
      <div className="create-post-section">
        {user ? (
          <CreatePostModal />
        ) : (
          <Button
            variant="outline"
            className="create-story-button"
            onClick={() => toast.error('Login first to create post')}
          >
            <PlusCircle className="icon" />
            Create Your Story
          </Button>
        )}
      </div>
      <div className="followers-list">
        <MyFollowers />
      </div>
      <div className="following-list">
        <FolowingList />
      </div>

      <style jsx>{`
        .sidebar-container {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          background: #1877F2;
          padding: 2rem;
          border-radius: 15px;
        }
        .create-post-section {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .followers-list,
        .following-list {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 1rem;
          border-radius: 10px;
          overflow: auto;
        }
        .create-story-button {
          width: 100%;
          background: #6b6bff;
          color: #fff;
          padding: 0.8rem;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .create-story-button:hover {
          background: #5050ff;
        }
        .icon {
          margin-right: 0.5rem;
          height: 1.5rem;
          width: 1.5rem;
        }
        @media (min-width: 1024px) {
          .sidebar-container {
            flex-direction: row;
          }
        }
        @media (max-width: 1024px) {
          .sidebar-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ContentBar;