"use client";

import StatCards from "@/components/dashboard/StatCards";

import PurschaseSummary from "@/components/dashboard/PurchaseSummary";
import SalesSummary from "@/components/dashboard/SalesSummary";
import PopularProducts from "@/components/dashboard/PopularProducts";
import ExpenseSummary from "@/components/dashboard/ExpenseSummary";

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-4">
      {/* stats */}
      <StatCards />

      {/* products and sales */}
      <div className="grid gap-4 lg:grid-cols-2">
        <PopularProducts />
        <SalesSummary />
      </div>

      {/* expenses and purchase */}
      <div className="grid gap-4 lg:grid-cols-2">
        <PurschaseSummary />
        <ExpenseSummary />
      </div>
    </section>
  );
}
