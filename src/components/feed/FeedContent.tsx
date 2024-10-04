/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useGetAllPostQuery } from "@/redux/features/post/post.api";
import { setPost } from "@/redux/features/post/post.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import PostCard from "../PostCard/PostCard";
import PostCardSkeleton from "../skeletons/PostCardSkeletons";
import NoPostFound from "./NoPostFound";


const FeedContent = () => {
  const { data: posts } = useAppSelector((state) => state.post);
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching } = useGetAllPostQuery({
    page: searchParams.get("page"),
    
    categories: searchParams.get("category") || "",
    searchTerm: searchParams.get("searchTerm") || "",
    premium: searchParams.get("premium") || "",
    sort: searchParams.get("sort") || "",
  });

 
  useEffect(() => {
    if (data?.data) {
      dispatch(setPost({ post: data.data, new: false }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    
    if (searchParams.get("page")) {
      router.push("/");
    }
  }, []);

  // Handler for loading the next page when the last post is in view
  const handleLoadMore = () => {
    if (!isFetching) {
      const params = new URLSearchParams(searchParams);
      const page = Number(searchParams.get("page") || 0) || 0;
      params.set("page", String(page + 1));
      router.push(`?${params.toString()}`);
    }
  };

  const Skeletons = (
    <>
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </>
  );

  if (isLoading) return <div className="w-full ">{Skeletons}</div>;

  if (!posts.length && !isFetching) return <NoPostFound />;
  const more = (data?.totalDoc || 0) > posts.length ? true : false;
  

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={more}
        useWindow={false}
        loader={
          <div className="w-[400px] lg:w-[700px] xl:w-[900px]">
            <PostCardSkeleton />
          </div>
        }
      >
       
        
        {posts.map((post, i) => {
          return <PostCard post={post} key={post._id} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default FeedContent;