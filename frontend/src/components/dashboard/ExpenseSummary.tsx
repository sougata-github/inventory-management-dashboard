import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieColorsDark, PieColorsLight } from "@/constants";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { ExpenseByCategorySummary } from "@/types";
import { useMediaQuery } from "usehooks-ts";
import { TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";

import Loader from "./Loader";

type ExpenseSums = {
  [category: string]: number;
};

const ExpenseSummary = () => {
  const matches = useMediaQuery("(min-width: 640px)");

  const { theme } = useTheme();

  const pieColors = theme === "light" ? PieColorsLight : PieColorsDark;

  const { data, isLoading, isError } = useGetDashboardMetricsQuery();

  const expenseByCategorySummary = data?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const formattedTotalExpenses = expenseCategories
    .reduce((acc, category: { value: number }) => acc + category.value, 0)
    .toFixed(2);

  const expenseSummary = data?.expenseSummary[0];

  if (isError) {
    return <div className="m-5">Failed to fetch data!</div>;
  }

  return (
    <div className="shadow rounded-xl border">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-base font-semibold p-5">Expense Summary</h3>

          <div className="mb-4 px-5">
            <p className="text-sm text-muted-foreground">Average</p>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-bold">
                {expenseSummary?.totalExpenses.toFixed(2)}
              </p>
              <span className="flex items-center text-sm">
                <TrendingUp className="size-4 mr-1" />
                30%
              </span>
            </div>
          </div>

          <div className="flex max-md:flex-col max-md:items-center max-md:gap-2 justify-center py-5">
            <div className="flex flex-col gap-4 items-center justify-start w-1/2">
              <ResponsiveContainer width="100%" height={168}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={expenseCategories}
                    nameKey="name"
                    innerRadius={matches ? 58 : 48}
                    outerRadius={matches ? 80 : 70}
                    strokeWidth={1}
                    cx={"50%"}
                    cy={"50%"}
                    fill="hsl(var(--foreground))"
                  >
                    {expenseCategories.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    itemStyle={{
                      color: "hsl(var(--muted-foreground))",
                    }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderRadius: "5px",
                      border: "hsl(var(--foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="-mt-1 text-center">
                <span className="font-bold text-sm">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>

            {/* labels */}
            <ul className="flex flex-col items-start justify-center xl:items-start py-5 gap-8">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="mr-2 size-[8px] rounded-full"
                    style={{
                      backgroundColor: pieColors[index % pieColors.length],
                    }}
                  />
                  <span>{entry.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseSummary;
