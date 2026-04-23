import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container my-8">
      <div className="my-2 md:my-10 space-y-4">
        <Skeleton className="bg-card h-10 w-1/3 rounded-full my-4 md:my-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <Skeleton
              key={index}
              className="bg-card w-full aspect-square rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
