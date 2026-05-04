import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container my-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-2 space-y-2">
          {[1, 2, 3].map((index) => (
            <Skeleton key={index} className="w-full bg-card h-60 rounded-xl" />
          ))}
        </div>
        <div className="flex-1 h-40 rounded-xl">
          <Skeleton className="w-full bg-card h-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
