import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <main className="container max-h-screen my-8">
      <section className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Skeleton className="rounded-xl bg-card w-full aspect-5/4" />
        </div>
        <div className="flex-1 flex flex-col gap-2 justify-between">
          <div>
            <Skeleton className="rounded-full bg-card w-1/2 md:w-1/4 h-14 my-4" />
            <Skeleton className="rounded-full bg-card w-1/3 md:w-1/5 h-8 my-4" />
            <Skeleton className="rounded-full bg-card w-2/3 md:w-1/3 h-5 indent-4" />
          </div>
          <div>
            <div className="space-y-4">
              <Skeleton className="bg-card rounded-full w-1/2 md:w-1/4 h-8" />
              <Skeleton className="bg-card rounded-full w-2/3 md:w-1/3 h-4" />
            </div>
            <div className="flex justify-between my-8">
              <Skeleton className="bg-card rounded-full w-1/2 md:w-1/4 h-12" />
              <Skeleton className="bg-card rounded-full w-1/2 md:w-1/4 h-12" />
            </div>
            <Skeleton className="bg-card w-full h-12" />
          </div>
        </div>
      </section>
    </main>
  );
}
