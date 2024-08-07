"use client";

import { useEffect, useState } from "react";
import { Masonry } from "masonic";
import Image from "next/image";
import PinCard from "./PinCard";
import { Photo } from "@/types/pin";

const MasonicColumns = ({ data }: { data: Photo[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Masonry
          items={data}
          columnGutter={10}
          columnWidth={236}
          overscanBy={5}
          render={({ data }) => <PinCard item={data} />}
        />
      )}
    </>
  );
};

const MasonryCard = ({ item }: any) => (
  <div className="w-full break-inside-avoid" id="pin_card">
    <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
      <div className="min-h-[120px]">
        <div className="relative max-w-full h-full">
          <Image
            src={item.download_url}
            alt={item.id}
            sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
            width={100}
            height={100}
            quality={75}
            loading="lazy"
            fetchPriority="auto"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default MasonicColumns;
