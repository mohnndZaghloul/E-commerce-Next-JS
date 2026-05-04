import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container my-8">
      <Skeleton className="bg-card w-full h-40 rounded-xl" />
      <div className="my-10 space-y-4">
        <Skeleton className="bg-card h-10 w-1/3 rounded-full my-8" />
        <Skeleton className="bg-card h-5 w-1/5 rounded-full" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Skeleton key={index} className="bg-card h-8 w-16 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <Skeleton
              key={index}
              className="bg-card w-full aspect-square rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
