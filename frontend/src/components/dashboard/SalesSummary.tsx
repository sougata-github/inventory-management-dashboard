import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { useMediaQuery } from "usehooks-ts";
import { TrendingUp } from "lucide-react";

import Loader from "./Loader";

const SalesSummary = () => {
  const matches = useMediaQuery("(min-width: 1024px)");

  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  if (isError) {
    return <div className="m-5">Failed to fetch data!</div>;
  }

  return (
    <div className="shadow rounded-xl border">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-base font-semibold p-5">Sales Summary</h3>

          <div>
            <div className="flex justify-between items-center px-5">
              <div>
                <p className="text-sm text-muted-foreground">Value</p>
                <span className="text-2xl font-bold">
                  $
                  {(totalValueSum / 1000000).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-sm ml-1.5">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
            </div>

            <ResponsiveContainer
              width="100%"
              height={280}
              className="mt-8 pr-5 pt-2 max-md:pb-4"
            >
              <BarChart data={salesData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                  tick={{ fontSize: 14, dx: 4 }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tick={{ fontSize: 15, dx: -4 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  itemStyle={{
                    color: "hsl(var(--muted-foreground))",
                  }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderRadius: "5px",
                    border: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                  cursor={false}
                />
                <Bar
                  dataKey="totalValue"
                  fill="hsl(var(--foreground))"
                  barSize={10}
                  radius={4}
                >
                  {salesData.map((_, index) => (
                    <Cell key={`cell-${index}`} width={matches ? 24 : 14} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesSummary;
