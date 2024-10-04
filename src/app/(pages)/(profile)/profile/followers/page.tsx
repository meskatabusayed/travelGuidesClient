import MyFollowers from "@/components/feed/MyFollowers";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

const page = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Followers</h2>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search followers" className="pl-8" />
        </div>
      </div>
      <ScrollArea className="h-[300px] px-4">
        <MyFollowers heading={false} />
      </ScrollArea>
    </div>
  );
};

export default page;