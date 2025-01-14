"use client";

import { useGetExpensesByCategoryQuery } from "@/state/api";
import Header from "@/components/Header";
import { useMemo, useState } from "react";
import Loader from "@/components/expenses/Loader";
import DatePicker from "@/components/expenses/DatePicker";
import SelectCategory from "@/components/expenses/SelectCategory";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  AggregatedDataItem,
  AggregatedData,
  ExpenseByCategorySummary,
} from "@/types";
import { useMediaQuery } from "usehooks-ts";
import { useTheme } from "next-themes";
import { PieColorsDark, PieColorsLight } from "@/constants";

const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export default function Expenses() {
  const {
    data: expensesData,
    isError,
    isLoading,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const matches = useMediaQuery("(min-width: 640px)");

  const { theme } = useTheme();

  const pieColors = theme === "light" ? PieColorsLight : PieColorsDark;

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate.toISOString() &&
            dataDate <= endDate.toISOString());

        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
          };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }

        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !expensesData) {
    return <div className="text-center py-4">Failed to fetch data!</div>;
  }

  console.log(aggregatedData);

  return (
    <section className="flex flex-col">
      <Header name="Expenses" />
      <p className="text-sm">A visual respresentation of expenses over time.</p>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-5">
        {/* Filter Card */}
        <div className="lg:w-1/2 shadow rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4">
            Filter By Category and Date
          </h3>

          <div className="space-y-4">
            {/* Category Select */}
            <SelectCategory setSelectedCategory={setSelectedCategory} />

            {/* Start Date Input */}
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              label="Start Date"
            />

            {/* End Date Input */}
            <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
          </div>
        </div>

        {/*Pie Chart*/}
        <div className="border shadow rounded-lg p-4 lg:w-1/2 w-full h-[360px]">
          {aggregatedData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  dataKey="amount"
                  data={aggregatedData}
                  innerRadius={matches ? 90 : 58}
                  outerRadius={matches ? 120 : 80}
                  strokeWidth={1}
                  cx={"50%"}
                  cy={"50%"}
                  fill="hsl(var(--foreground))"
                >
                  {aggregatedData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length > 0) {
                      const { name, value } = payload[0];
                      return (
                        <div
                          style={{
                            backgroundColor: "hsl(var(--background))",
                            borderRadius: "5px",
                            border: "hsl(var(--background))",
                            padding: "8px",
                          }}
                        >
                          <p>{name}</p>
                          <p>{value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-medium">No data available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
