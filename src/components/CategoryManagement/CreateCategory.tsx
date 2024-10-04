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
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Label htmlFor="label">Category label</Label>
            <Input id="label" className="col-span-3" />
          </div>
          <Button>Create Category</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;