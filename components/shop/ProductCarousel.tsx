import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Product_TP } from "@/lib/types";

export default function ProductCarousel({ product }: { product: Product_TP }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="aspect-5/4 relative shadow-lg shadow-card-shadow rounded-3xl overflow-hidden">
      <CarouselContent>
        {product.images.map((image) => (
          <CarouselItem key={image} className="relative bg-muted aspect-5/4">
            <Image
              src={image}
              alt={product.title}
              fill
              className="w-full h-full object-contain object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="ghost"
        className="-left-1 cursor-pointer hover:bg-transparent/50 active:-translate-y-1/2! rounded-xl h-full w-32"
      />
      <CarouselNext
        variant="ghost"
        className="-right-1 cursor-pointer hover:bg-transparent/50 active:-translate-y-1/2! rounded-xl h-full w-32"
      />
    </Carousel>
  );
}
