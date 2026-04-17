import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container">
      <div className="my-8 space-y-4">
        <Skeleton className="w-[12%] h-4 rounded-md" />
        <Skeleton className="w-[36%] h-4 rounded-md" />
      </div>
      <div className="border-2 rounded-md p-10 space-y-4">
        {[1, 2, 3].map((number) => (
          <div key={number} className="flex justify-between items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-[85%] h-4 rounded-md" />
              <Skeleton className="w-[65%] h-4 rounded-md" />
              <Skeleton className="w-[80%] h-4 rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-28 h-10 rounded-md" />
              <Skeleton className="w-28 h-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
