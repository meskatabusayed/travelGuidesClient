import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import React from "react";
const GlobeTalesPagination = ({
  totalDoc,
  limit,
  onPageChange,
  className,
}: {
  totalDoc: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className={`flex items-center justify-start gap-[8px] ${className}`}>
      <Label>Page</Label>
      <Pagination className="w-fit mx-0">
        <PaginationContent>
          {Array.from({
            length: Math.ceil(totalDoc / (limit || 10)),
          }).map((_, i) => (
            <PaginationItem key={i + "page"}>
              <PaginationLink
                onClick={() => {
                  setCurrentPage(i + 1);
                  onPageChange?.(i + 1);
                }}
                className={`${
                  currentPage === i + 1
                    ? "bg-purple text-white bg-primary hover:bg-primary hover:text-white"
                    : "text-primary hover:text-primary cursor-pointer"
                } border-[1px] border-secondary w-fit h-fit px-[10px] py-[3px] cursor-pointer`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default GlobeTalesPagination;