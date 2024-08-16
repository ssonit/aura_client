"use client";

import { useEffect, useState } from "react";
import { Masonry } from "masonic";
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
          columnGutter={16}
          columnWidth={236}
          overscanBy={5}
          render={({ data }) => <PinCard item={data} />}
        />
      )}
    </>
  );
};

export default MasonicColumns;
