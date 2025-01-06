import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(16)].map((_, index) => (
          <div key={index}>
            <Skeleton className="w-full h-[160px] rounded-lg animate-pulse trasition duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
