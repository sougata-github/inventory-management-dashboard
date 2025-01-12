import React from "react";

import { Skeleton } from "../ui/skeleton";

const Loader = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-5">
      <div>
        <Skeleton className="rounded-lg h-[320px] xl:w-[600px] lg:w-[400px] w-full animate-pulse transition-all" />
      </div>
      <div>
        <Skeleton className="rounded-lg h-[320px] xl:w-[600px] lg:w-[400px] w-full animate-pulse transition-all" />
      </div>
    </div>
  );
};

export default Loader;
