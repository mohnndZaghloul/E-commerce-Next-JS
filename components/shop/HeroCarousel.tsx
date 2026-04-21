import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HeroCarousel() {
  return (
    <div className="container my-8">
      <h1 className="text-5xl font-semibold uppercase text-transparent text-stroke my-8">
        Carousel Header
      </h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="aspect-16/5 relative shadow-2xl shadow-card-shadow rounded-3xl overflow-hidden">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent className="flex aspect-16/5 items-center justify-center">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="ghost"
          className="-left-1 cursor-pointer active:-translate-y-1/2! rounded-2xl h-full w-32"
        />
        <CarouselNext
          variant="ghost"
          className="-right-1 cursor-pointer active:-translate-y-1/2! rounded-2xl h-full w-32"
        />
      </Carousel>
    </div>
  );
}
