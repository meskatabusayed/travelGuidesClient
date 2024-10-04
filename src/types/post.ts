import { ICategories } from "./category";
import { TUser } from "./user";

interface IPostReqired {
  content: string;
  images: string[];
  premium: boolean;
}

export interface IPostCreate extends IPostReqired {
  categories: string[];
}

export interface IPost extends IPostReqired {
  _id: string;
  categories: ICategories[];
  user: TUser;
  upvotes: string[];
  downvotes: string[];
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export type TVoting = "upvote" | "downvote";