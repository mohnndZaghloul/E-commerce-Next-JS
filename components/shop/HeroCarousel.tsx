import img1 from "@/public/slider/slider1.avif";
import img2 from "@/public/slider/slider2.gif";
import img3 from "@/public/slider/slider3.avif";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function HeroCarousel() {
  const sliderImages = [img1, img2, img3];
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
        className="aspect-16/4 relative shadow-2xl shadow-card-shadow rounded-3xl overflow-hidden">
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-16/4">
                <Image
                  src={image}
                  alt="alt"
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
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
