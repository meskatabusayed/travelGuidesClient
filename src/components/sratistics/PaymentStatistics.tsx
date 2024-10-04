/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetPaymentStatisticsQuery } from "@/redux/features/statistics/statistics.api";
import { addDays, format, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-day-picker";
import DateRangePicker from "../shared/DateRangePicker";
import StatisticSkeleton from "../skeletons/StatisticSkeleton";

export const description = "An interactive bar chart";

const chartConfig = {
  amount: {
    label: "amount",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

function PaymentStatistics() {
  const searchParams = useSearchParams();
  const getYear = searchParams.get("year");
  const year = getYear ? Number(getYear) : new Date().getFullYear();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const { data, isLoading } = useGetPaymentStatisticsQuery(selectedDateRange);

  const monthlyTotals = data?.data?.reduce((acc, transaction) => {
    const date = parseISO(transaction.createdAt);
    const month = format(date, "MMMM");

    // @ts-ignore
    if (!acc[month]) {
      // @ts-ignore
      acc[month] = 0;
    }

    // @ts-ignore
    acc[month] += transaction.amount;

    return acc;
  }, {});

  const result = Object.entries(monthlyTotals || {}).map(([month, total]) => ({
    month,
    amount: total as number,
  }));

  if (isLoading) {
    return <StatisticSkeleton />;
  }
  const handleDateChange = (date: DateRange | undefined) => {
    if (date) {
      setSelectedDateRange(date);
    }
  };
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <div className="w-full flex items-center justify-between">
              <CardTitle>Payment - Statistics</CardTitle>
              <div className="relative">
                <DateRangePicker onChange={handleDateChange} />
              </div>
            </div>
            <CardDescription>
              Showing toal payment of year {year}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
            <BarChart accessibilityLayer data={result}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentStatistics;