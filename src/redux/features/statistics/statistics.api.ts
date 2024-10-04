/* eslint-disable @typescript-eslint/ban-ts-comment */
import { api } from "@/redux/api/appSlice";
import { IPaymentData } from "@/types/payment";
import { IUserStatistics } from "@/types/statistics";
import { DateRange } from "react-day-picker";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentStatistics: builder.query<{ data: IPaymentData[] }, DateRange>({
      query: (payload) => {
        const query = Object.keys(payload)
          // @ts-ignore
          .map((key) => `${key}=${payload[key].toISOString()}`)
          .join("&");

        return {
          url: `/statistics/payment?${query}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getUserStatistics: builder.query<{ data: IUserStatistics }, undefined>({
      query: () => {
        return {
          url: `/statistics/user`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
  }),
});
export const { useGetPaymentStatisticsQuery, useGetUserStatisticsQuery } =
  categoryApi;