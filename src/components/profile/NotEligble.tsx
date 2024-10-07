import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

const NotEligble = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="mt-[20px] relative bg-[#1877F2] text-white"
        >
          Verify Account
          
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
             You are not eligible for verification
          </DialogTitle>
          <DialogDescription>
            We&lsquo;re sorry, but you&lsquo;re not currently eligible to verify
            your account.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            To be eligible for account verification, you need to meet the
            following criteria:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Have at least one upvote on your posts</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Keep engaging with the community and creating quality content.
            You&lsquo;ll be eligible for verification once you meet these
            requirements.
          </p>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default NotEligble;