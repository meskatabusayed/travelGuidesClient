import { BoxIcon } from "lucide-react";

const NoPostFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#F5F7FA] to-[#E6E9F0] px-4 py-12 sm:px-6 lg:px-8 w-full h-[50vh] rounded-lg shadow-lg">
  <div className="mx-auto max-w-md text-center">
    <BoxIcon className="mx-auto h-12 w-12 text-[#FF6F61]" />
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#333] sm:text-4xl">
      No Posts Found
    </h1>
    <p className="mt-4 text-gray-600">
      It looks like there are no posts available at the moment. Please try again later or check back soon.
    </p>
    <button className="mt-6 px-4 py-2 bg-[#FF6F61] text-white rounded-md hover:bg-[#FF4343] transition-colors">
      Refresh
    </button>
  </div>
</div>

  );
};

export default NoPostFound;