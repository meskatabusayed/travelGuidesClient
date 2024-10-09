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
    <div className="w-full p-4 bg-gray-100 min-h-screen flex items-center justify-center">
  <Card className="w-full max-w-4xl rounded-lg shadow-lg bg-white">
    
    <CardHeader className="flex flex-col items-stretch border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-lg sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col justify-center gap-1">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-xl font-bold">Payment - Statistics</CardTitle>
          <div className="relative">
            <DateRangePicker
              onChange={handleDateChange}
              className="bg-white text-gray-800 rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
        <CardDescription className="text-sm font-light mt-2 text-white">
          Showing total payment of the year <span className="font-semibold">{year}</span> (please select date...)
        </CardDescription>
      </div>
    </CardHeader>

   
    <CardContent className="p-6 bg-white rounded-b-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Yearly Payment Breakdown</h3>
        <span className="text-sm text-gray-500">Updated: {new Date().toLocaleDateString()}</span>
      </div>

      
      <ChartContainer
        config={chartConfig}
        className="bg-gray-50 rounded-lg shadow-inner p-4"
      >
        <BarChart
          data={result}
          className="w-full h-64"
        >
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            stroke="#9CA3AF"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="amount"
            fill="url(#colorGradient)"
            radius={[5, 5, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
</div>

  );
}

export default PaymentStatistics;