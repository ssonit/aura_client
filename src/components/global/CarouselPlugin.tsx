"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const discover = [
  {
    id: 1,
    src: "/assets/laptop-citycape.jpg",
    alt: "Interior design inspiration",
  },
  {
    id: 2,
    src: "/assets/illustrated.jpg",
    alt: "Fashion inspiration",
  },
  {
    id: 3,
    src: "/assets/beauti-lap.jpg",
    alt: "Food recipe inspiration",
  },
  {
    id: 4,
    src: "/assets/travel.jpg",
    alt: "Travel inspiration",
  },
];

export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 0, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {discover.map((item) => (
          <CarouselItem key={item.id}>
            <div className="w-full">
              <Card>
                <CardContent className="p-0">
                  <img
                    alt={item.alt}
                    className="w-full rounded-md h-[600px]"
                    src={item.src}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
