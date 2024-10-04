/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/redux/api/appSlice";
import { IPost, IPostCreate, TVoting } from "@/types/post";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query<
      { data: IPost[]; totalDoc: number },
      Record<string, any>
    >({
      query: (payload) => {
        const query = Object.keys(payload)
          .map((key) => `${key}=${payload[key]}`)
          .join("&");
        return {
          url: `/post/get?${query}`,
          method: "GET",
          keepUnusedDataFor: 0,
        };
      },
      providesTags: ["post"],
    }),
    getPostById: builder.query<{ data: IPost }, string>({
      query: (id) => {
        return {
          url: `/post/get/${id}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    cratePost: builder.mutation<{ data: IPost }, IPostCreate>({
      query: (payload) => {
        return {
          url: `/post/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation<{ data: IPost }, string>({
      query: (postId) => {
        return {
          url: `/post/delete/${postId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),
    votePost: builder.mutation<
      { data: IPost },
      { postId: string; vote: TVoting }
    >({
      query: (payload) => {
        return {
          url: `/post/vote/${payload.postId}?vote=${payload.vote}`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const {
  useGetAllPostQuery,
  useVotePostMutation,
  useCratePostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
} = postApi;