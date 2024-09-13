"use client";

import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { Photo } from "@/types/pin";
import { useEffect, useState } from "react";

const RelatedPins = ({ pins }: { pins: Photo[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <div className="mt-12 container">
          <h2 className="text-2xl font-bold mb-6 text-center">
            More like this
          </h2>
          <MasonryInfinityScroll initData={pins} />
        </div>
      )}
    </>
  );
};

export default RelatedPins;
