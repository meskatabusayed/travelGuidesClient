/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCratePostMutation } from "@/redux/features/post/post.api";
import { addNewPost } from "@/redux/features/post/post.slice";
import { useAppSelector } from "@/redux/hook";
import { IPostCreate } from "@/types/post";
import { upLoadSingeImage } from "@/utils/uploadSingleImage";
import { PlusCircle, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PrimeReactProvider } from "primereact/api";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CategorySelector from "./CategorySelector";

export default function CreatePostModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  const [createPost] = useCratePostMutation();

  const [imageLoading, setImageLoading] = useState(false);

  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !user || imageLoading) return;
    if (images.length >= 4) return;
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageLoading(true);
      const { data } = await upLoadSingeImage(file, token);
      setImages((prev) => [...prev, data]);
      setImageLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!token || !user) return toast.error("Login first to create post");
    if (imageLoading) return;
    if (!content) {
      return toast.error("Please write something in content");
    }

    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    if (categories.length === 0) {
      return toast.error("Please select at least one category");
    }

    const toastId = toast.loading("Please wait...");
    try {
      const payload: IPostCreate = {
        content,
        images,
        categories,
        premium: isPremium,
      };
      const { data } = await createPost(payload);

      toast.dismiss(toastId);
      toast.success("Post created successfully");
      console.log(data);

      if (data && data.data) {
        const payload = {
          ...data.data,
          user,
        };
        dispatch(addNewPost(payload));
      }
      router.push(`/?page=1`);

      setOpen(false);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="w-full mb-4 bg-gradient-to-r from-[#4c6ef5] to-[#1877F2] text-white rounded-lg shadow-md hover:from-[#3b5bfd] hover:to-[#2851F2] transition-all duration-300"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Create Your Post
      </Button>
    </DialogTrigger>
    
    <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-auto smoothBar bg-gradient-to-r from-[#ffffff] to-[#f7faff] shadow-2xl rounded-lg p-6">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl font-semibold text-[#1877F2]">Create Post</DialogTitle>
      </DialogHeader>
  
      <PrimeReactProvider>
        <div className="space-y-5 flex flex-col w-full gap-[15px]">
          
         
          <div className="flex flex-col gap-3">
            <Label htmlFor="content" className="text-lg text-[#4c6ef5] font-medium">Your Travel Story</Label>
            <Editor
              value={content}
              style={{ height: "200px", borderRadius: "10px", border: "1px solid #1877F2", padding: "10px" }}
              onTextChange={(e) => setContent(e.htmlValue || "")}
              className="shadow-inner"
            />
          </div>
          
         <div className="border-[2px] border-[#4c6ef5] rounded-md shadow-md p-2">
          <CategorySelector
            onChange={(values) => {
              const value = values.map((item) => item._id);
              setCategories(value);
            }}
            
          />
          </div>
  
         
          <div className="flex flex-col gap-3">
            <Label htmlFor="images" className="text-lg text-[#4c6ef5] font-medium">Attach Images</Label>
            <div className="flex items-center gap-4">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="image"
                  width={90}
                  height={90}
                  className="w-[90px] h-[90px] object-cover rounded-lg shadow-md"
                />
              ))}
              {images.length < 4 && (
                <>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="images"
                    className="flex items-center flex-col justify-center w-[90px] h-[90px] px-4 py-2 text-sm font-medium text-gray-700 bg-[#f7faff] border-2 border-[#4c6ef5] rounded-lg shadow-md hover:bg-[#e0e7ff] cursor-pointer transition-all relative"
                  >
                    <Upload className="w-5 h-5" />
                    Upload
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 w-full h-full bg-[#0000003d]">
                        <ImSpinner2 className="animate-spin" />
                      </div>
                    )}
                  </Label>
                </>
              )}
            </div>
          </div>
  
          <div>
            <div className="flex items-center gap-4">
              <Switch
                id="premium"
                disabled={!user?.isPremium}
                checked={isPremium}
                onCheckedChange={setIsPremium}
                className="bg-[#1877F2] shadow-md"
              />
              <Label htmlFor="premium" className="text-md text-[#4c6ef5]">Mark as Premium Content</Label>
            </div>
            {!user?.isPremium && (
              <span className="text-sm text-red-500">
                * This can be accessed only by verified users
              </span>
            )}
          </div>
  
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4c6ef5] to-[#1877F2] text-white rounded-lg shadow-lg hover:from-[#3b5bfd] hover:to-[#2851F2] transition-all duration-300"
            onClick={handleSubmit}
          >
            Create Post
          </Button>
        </div>
      </PrimeReactProvider>
    </DialogContent>
  </Dialog>
  
  );
}