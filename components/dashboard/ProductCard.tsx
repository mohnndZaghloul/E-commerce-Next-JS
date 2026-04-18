import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product_TP } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  title,
  images,
  rating,
  price,
  description,
}: Product_TP) {
  return (
    <div className="aspect-square shadow-xl flex flex-col justify-between border rounded-md overflow-hidden">
      <div className="relative h-[60%]">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="bg-muted w-full object-cover bg-center"
        />
      </div>
      <div>
        <div className="flex justify-between items-center p-2 border-b">
          <h3 className="capitalize text-lg font-semibold line-clamp-1">
            {title}
          </h3>
          <div className="flex justify-center items-center gap-2 text-nowrap">
            <Badge
              className={`${rating > 4 ? "bg-primary" : rating < 4 && rating > 3 ? "bg-amber-500" : rating < 3 && rating > 2 ? "bg-orange-500" : "bg-destructive"}`}>
              {rating} <Star className="fill-white" />
            </Badge>
            <span className="font-semibold text-xl">{price} EGP</span>
          </div>
        </div>
        <div className="p-2">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {description}
          </p>
        </div>
      </div>
      <div className="bg-muted border-t p-3">
        <Button
          variant="outline"
          className="w-full capitalize"
          nativeButton={false}
          render={<Link href={`./dashboard/products/${id}`}>edit</Link>}
        />
      </div>
    </div>
  );
}
