import { IconType } from "react-icons";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiUser, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";
export interface NavItem {
  href: string;
  title: string;
  Icon: IconType;
}

export const adminLinks: NavItem[] = [
  {
    href: "/dashboard",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/community-post",
    Icon: CiUser,
    title: "Community Posts",
  },
  {
    href: "/dashboard/manage-user",
    Icon: CiViewList,

    title: "Manage Users",
  },
  {
    href: "/dashboard/manage-categories",
    Icon: BsFileEarmarkPost,
    title: "Manage Categories",
  },
];