/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { baseUrl } from "@/redux/api/appSlice";
import { useAppSelector } from "@/redux/hook";
import { CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import { PiSpinnerBallFill } from "react-icons/pi";
const GetPremiumAccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useAppSelector((state) => state.auth);

  const handleGetPremiumAccess = async () => {
    setIsLoading(true);
    try {
      
      const url = baseUrl + "/user/get-varify-url";
      console.log("url" , url);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = (await res.json()) || {};

      if (data && data.payment_url) {
        window.location.href = data.payment_url;
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={() => setIsLoading(false)}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="mt-[20px] bg-[#1877F2] text-white relative"
        >
          Verify Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5 text-[#1877F2]" />
            You&lsquo;re Eligible for Premium Verification!
          </DialogTitle>
          <DialogDescription>
            Congratulations! You can now verify your account and get premium
            access.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-[#1877F2]" />
              Premium Access Benefits
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#1877F2]" />
                Verified sign on your profile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#1877F2]" />
                Create premium posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#1877F2]" />
                Exclusive content 
              </li>
              
            </ul>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">Premium Access Price</p>
            <p className="text-3xl font-bold  text-[#1877F2]">400 BDT</p>
            <Badge variant="secondary" className="mt-2">
              Cancel anytime
            </Badge>
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-center">
          <DialogClose asChild>
            <Button variant="outline">Maybe Later</Button>
          </DialogClose>
          <Button
            onClick={handleGetPremiumAccess}
            className="flex items-center justify-center gap-[5px] bg-[#1877F2]"
          >
            Continue to Verification{" "}
            {isLoading ? <PiSpinnerBallFill className="animate-spin h-4 w-4" /> : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GetPremiumAccess;
