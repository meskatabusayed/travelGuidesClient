/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/redux/api/appSlice";
import { ICategories } from "@/types/category";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { data: ICategories[]; totalDoc: number },
      Record<string, any>
    >({
      query: (payload) => {
        const query = Object.keys(payload)
          .map((key) => `${key}=${payload[key]}`)
          .join("&");
        return {
          url: `/category/get?${query}`,
          method: "GET",
          keepUnusedDataFor: 0,
        };
      },

      providesTags: ["category"],
    }),
    getCategoriesByName: builder.query<
      { data: ICategories[]; totalDoc: number },
      string
    >({
      query: (name) => {
        return {
          url: `/category/get/${name}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    createCategory: builder.mutation<ICategories, undefined>({
      query: (label) => {
        return {
          url: `/category/create`,
          method: "POST",
          body: { label },
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation<ICategories, string>({
      query: (id) => {
        return {
          url: `/category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetCategoriesByNameQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;