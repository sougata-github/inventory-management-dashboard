import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag, Star } from "lucide-react";

import Loader from "./Loader";

const PopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="shadow rounded-xl border">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-base font-semibold p-5">Popular Products</h3>
          <ul className="flex flex-col gap-1 pb-4">
            {dashboardMetrics?.popularProducts.map((product) => (
              <li
                key={product.productId}
                className="flex justify-between items-center gap-3 max-lg:gap-5 max-md:gap-3 px-5 py-4"
              >
                <div className="flex items-center gap-2 max-md:gap-3">
                  <div className="rounded-full p-2 bg-muted-foreground/10">
                    <ShoppingBag className="size-4" />
                  </div>

                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-semibold text-sm">{product.name}</div>
                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                      <span className="text-xs">${product.price}</span>
                      <span className="mx-2">|</span>
                      <div className="flex items-center gap-1">
                        <Star className="size-[12px]" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-semibold flex gap-2 items-center px-2 max-lg:px-0 max-md:px-2">
                  <span>{Math.round(product.stockQuantity / 1000)}k sold</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PopularProducts;
