"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategoryMutation } from "@/redux/features/category/category.api";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
const CreateCategory = () => {
  const [createCategory] = useCreateCategoryMutation(undefined);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const label = form.label.value;

    createCategory(label);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Category
      </Button>
    </DialogTrigger>
  
    <DialogContent className="bg-white rounded-lg shadow-lg p-6 sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-800">Create New Category</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="label" className="text-gray-700 font-medium">Category Label</Label>
          <Input id="label" className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200" placeholder="Enter category name" />
        </div>
  
        <Button type="submit" className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-200 rounded-md shadow-md">
          Create Category
        </Button>
      </form>
    </DialogContent>
  </Dialog>
  
  );
};

export default CreateCategory;