"use client";

import { useEffect, useState } from "react";
import { Masonry } from "masonic";
import PinCard from "./PinCard";
import { Photo } from "@/types/pin";
import { dynamicBlurDataUrl } from "@/utils/helpers";

const MasonicColumns = ({ data }: { data: Photo[] }) => {
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState<Photo[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const newData = data.map(async (item) => ({
        ...item,
        placeholder: await dynamicBlurDataUrl(item.download_url),
      }));
      const photos = await Promise.all(newData);
      setItems(photos);
    }
    fetchData();
  }, [data]);

  return (
    <>
      {isClient && (
        <Masonry
          items={items}
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
