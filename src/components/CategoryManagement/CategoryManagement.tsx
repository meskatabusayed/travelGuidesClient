"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebounce from "@/hooks/debounce";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { format } from "date-fns";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import CreateCategory from "./CreateCategory";
import DeleteCategory from "./DeleteCategory";


export default function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounsedSearchTerm = useDebounce(searchTerm, 500);

  const { data } = useGetAllCategoriesQuery({
    page: 1,
    limit: 10,
    searchTerm: debounsedSearchTerm,
  });

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md">
 
  <div className="flex justify-between items-center pb-4 border-b border-gray-300">
    <h1 className="text-3xl font-bold text-indigo-800">Category Search</h1>
    <CreateCategory />
  </div>

 
  <div className="flex items-center justify-between">
    <Input
      type="text"
      placeholder="Search categories..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-md p-3 border rounded-lg shadow-sm"
    />
  </div>

  
  <Card className="bg-gray-50 rounded-xl shadow-lg">
    <CardContent>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left text-lg text-gray-700">Category Name</TableHead>
            <TableHead className="text-left text-lg text-gray-700">Created At</TableHead>
            <TableHead className="text-left text-lg text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((category) => (
            <TableRow key={category._id} className="hover:bg-gray-100 transition-colors duration-150">
              <TableCell className="py-4">{category.label}</TableCell>
              <TableCell className="py-4">
                {format(
                  new Date(category.createdAt || "2024-09-29"),
                  "MMM dd, yyyy"
                )}
              </TableCell>
              <TableCell className="py-4">
                <DeleteCategory id={category._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</div>

  );
}