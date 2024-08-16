"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchPins } from "@/actions/pins";
import MasonicColumns from "./MasonicColumns";
import { Photo } from "@/types/pin";
import { dynamicBlurDataUrl } from "@/utils/helpers";

let page = 2;

const MasonryInfinityScroll = ({ initData }: { initData: Photo[] }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });

  const [data, setData] = useState<Photo[]>(initData);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    const res = await fetchPins(page, 10);
    const newData = [...data, ...res].map(async (item) => ({
      ...item,
      placeholder: await dynamicBlurDataUrl(item.download_url),
    }));
    const photos = await Promise.all(newData);
    setData(photos);
    page++;
    setIsLoading(false);
  }

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isLoading]);

  return (
    <div className="w-full">
      <MasonicColumns data={data} />
      <section className="flex justify-center items-center w-full mt-20">
        <div ref={ref}></div>
      </section>
    </div>
  );
};

export default MasonryInfinityScroll;
