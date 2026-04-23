import { ArrowDownAZIcon } from "lucide-react";

type StaticCard_TP = {
  title: string;
  icon: React.ReactNode;
  staticName: string;
  staticNumber: string;
};
export default function StaticCard({
  title,
  icon,
  staticName,
  staticNumber,
}: StaticCard_TP) {
  return (
    <div className="w-full p-5 space-y-10 border capitalize rounded-md bg-linear-to-t from-card to-card/20">
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="text-2xl md:text-3xl tracking-widest">{title}</h1>
      </div>
      <div className="text-2xl md:text-4xl text-end space-x-2">
        <span
          className="text-4xl md:text-7xl font-light text-transparent 
           text-stroke-2 ">
          {staticNumber}
        </span>
        <span className="uppercase text-muted-foreground font-semibold tracking-wide">
          {staticName}
        </span>
      </div>
    </div>
  );
}
