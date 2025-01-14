import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";

import Loader from "./Loader";

const PurschaseSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();

  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  if (isError) {
    return <div className="m-5">Failed to fetch data!</div>;
  }

  return (
    <div className="shadow rounded-xl border">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-base font-semibold p-5">Purchase Summary</h3>

          <div className="mb-4 px-5">
            <p className="text-sm text-muted-foreground">Purchased</p>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-bold">
                {lastDataPoint
                  ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                  : "0"}
              </p>
              {lastDataPoint && (
                <span className="text-sm inline-flex items-center gap-1">
                  {lastDataPoint.changePercentage! >= 0 ? (
                    <TrendingUp className="size-4" />
                  ) : (
                    <TrendingDown className="size-4" />
                  )}
                  {Math.abs(lastDataPoint.changePercentage!)}%
                </span>
              )}
            </div>
          </div>

          {/* Area Chart */}
          <ResponsiveContainer
            width="100%"
            height={200}
            className="mt-10 max-md:p-2 px-5"
          >
            <AreaChart data={purchaseData}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                tick={{ fontSize: 15, dx: -20 }}
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
              />
              <Area
                fill="hsl(var(--foreground))"
                type="natural"
                dataKey="totalPurchased"
                stroke="hsl(var(--foreground))"
                strokeOpacity={1}
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default PurschaseSummary;
