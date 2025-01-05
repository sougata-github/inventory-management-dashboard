import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader className="size-5 animate-spin transition-all" />
    </div>
  );
}
