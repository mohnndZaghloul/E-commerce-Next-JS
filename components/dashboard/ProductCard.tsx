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
    <div className="aspect-square flex flex-col justify-between border rounded-md overflow-hidden">
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
          <h3 className="capitalize text-lg font-semibold">{title}</h3>
          <div className="flex gap-2">
            <Badge>
              {rating} <Star className="fill-secondary-foreground" />
            </Badge>
            <Badge>{price} $</Badge>
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
