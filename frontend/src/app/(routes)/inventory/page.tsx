"use client";

import Header from "@/components/Header";
import { DataGrid } from "@/components/DataGrid";
import Loader from "@/components/inventory/Loader";
import { productsColumns } from "@/constants";
import { useGetProductsQuery } from "@/state/api";

export default function Inventory() {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !products) {
    return <div className="text-center py-4">Failed to fetch data!</div>;
  }

  return (
    <section className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid columns={productsColumns} data={products} />
    </section>
  );
}
