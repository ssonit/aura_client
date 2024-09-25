"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import PinCard from "./PinCard";
import { Photo } from "@/types/pin";
import { Masonry } from "masonic";
import { usePrevious } from "@uidotdev/usehooks";

const MasonicColumns = ({
  data,
  itemKey,
}: {
  data: Photo[];
  itemKey: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemsCount = data.length;
  const prevItemsCount = usePrevious(itemsCount);

  const removesCount = useRef(0);

  const gridKeyPostfix = useMemo(() => {
    if (!itemsCount || !prevItemsCount) return removesCount.current;
    if (itemsCount < prevItemsCount) {
      removesCount.current += 1;
      return removesCount.current;
    }

    return removesCount.current;
  }, [itemsCount, prevItemsCount]);

  return (
    <>
      {isClient && data.length > 0 && (
        <Masonry
          key={`${itemKey}-${gridKeyPostfix}`}
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
