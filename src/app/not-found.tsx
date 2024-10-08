import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-12 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-md text-center bg-white p-8 rounded-lg shadow-lg">
    <TriangleAlertIcon className="mx-auto h-16 w-16 text-red-500 animate-bounce" />
    <h1 className="mt-4 text-4xl font-extrabold text-red-600 sm:text-5xl">
      Oops, page not found!
    </h1>
    <p className="mt-4 text-gray-600 text-lg">
      The page you&apos;re looking for doesn&apos;t exist.
    </p>
    <div className="mt-8">
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        prefetch={false}
      >
        Go to Homepage
      </Link>
    </div>
  </div>
</div>

  );
}