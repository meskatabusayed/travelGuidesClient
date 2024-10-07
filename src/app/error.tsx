"use client"; 


import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold text-red-600 sm:text-4xl">
          Oops, something went wrong!
        </h1>
        
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-[#1877F2] px-4 py-2 text-sm font-medium  shadow-sm transition-colors hover:bg-[#1877F2]/90 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2 mr-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
          <Button className="bg-[#34b3a0]" onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}