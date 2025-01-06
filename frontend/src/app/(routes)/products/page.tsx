"use client";

import Header from "@/components/Header";
import CreateProductModal from "@/components/products/CreateProductModal";
import Loader from "@/components/products/Loader";
import ProductsList from "@/components/products/ProductsList";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery } from "@/state/api";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !products) {
    return <div className="text-center py-4">Failed to fetch products!</div>;
  }

  return (
    <section className="flex flex-col">
      <div className="w-full flex justify-between items-center mb-2">
        <Header name="Products" />
        <CreateProductModal />
      </div>

      <div className="relative mt-5">
        <SearchIcon className="size-4 absolute top-[10px] left-2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-8 placeholder:text-sm max-w-md"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* products list */}
      <ProductsList data={products} />
    </section>
  );
}
