import { BoxIcon } from "lucide-react";

const NoPostFound = () => {
  return (
    <div className="flex  flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 w-full h-[50vh]">
      <div className="mx-auto max-w-md text-center">
        <BoxIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          No Post found
        </h1>
        <p className="mt-4 text-muted-foreground">
          It looks like there are no products available at the moment. Please
          try again later or check back soon.
        </p>
      </div>
    </div>
  );
};

export default NoPostFound;