"use client";

import img1 from "@/public/slider/slider1.png";
import img2 from "@/public/slider/slider2.png";
import img3 from "@/public/slider/slider3.png";
import img4 from "@/public/slider/slider4.png";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function HeroCarousel() {
  const sliderImages = [img1, img2, img3, img4];
  return (
    <div className="container my-4 md:my-8">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="aspect-16/2 relative shadow-2xl shadow-card-shadow rounded-3xl overflow-hidden">
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-16/2">
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
          className="-left-1 cursor-pointer hover:opacity-50 active:-translate-y-1/2! rounded-xl h-full w-32"
        />
        <CarouselNext
          variant="ghost"
          className="-right-1 cursor-pointer hover:opacity-50 active:-translate-y-1/2! rounded-xl h-full w-32"
        />
      </Carousel>
    </div>
  );
}
