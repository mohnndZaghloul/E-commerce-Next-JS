import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container">
      <div className="my-8 space-y-4">
        <Skeleton className="bg-card w-[12%] h-4 rounded-xl" />
        <Skeleton className="bg-card w-[36%] h-4 rounded-xl" />
      </div>
      <div className="border-2 rounded-xl p-10 space-y-4">
        {[1, 2, 3].map((number) => (
          <div key={number} className="flex justify-between items-center gap-4">
            <Skeleton className="bg-card w-24 h-24 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="bg-card w-[85%] h-4 rounded-xl" />
              <Skeleton className="bg-card w-[65%] h-4 rounded-xl" />
              <Skeleton className="bg-card w-[80%] h-4 rounded-xl" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="bg-card w-28 h-10 rounded-xl" />
              <Skeleton className="bg-card w-28 h-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
