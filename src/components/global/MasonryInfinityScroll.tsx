"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";
import MasonicColumns from "./MasonicColumns";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { fetchPins, handleListPins } from "@/actions/pins";
import { getCookie } from "cookies-next";
import { MasonryType, SortType } from "@/constants";

const MasonryInfinityScroll = ({
  initData,
  type = MasonryType.Home,
  q,
}: {
  initData: Photo[];
  q?: string;
  type?: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });

  const [data, setData] = useState<Photo[]>(() => initData);
  const [page, setPage] = useState(2);
  const [pagePin, setPagePin] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Trạng thái kiểm soát
  const access_token = getCookie("access_token") as string;

  useEffect(() => {
    setData(initData);
    setPage(2); // Reset page for new query
    setHasMoreData(true); // Reset the end of data flag for new query
  }, [initData]);

  async function fetchData() {
    try {
      setIsLoading(true);
      let pins: Photo[] = [];
      const filter: any = {
        sort: SortType.Desc,
      };

      if (type === MasonryType.Search && q) {
        filter["title"] = q;
      }

      const res = await handleListPins(page, 20, access_token, filter);
      if (!res.data) {
        if (type === MasonryType.Home) {
          const result = await fetchPins(pagePin, 10);
          pins = result.map((item) => ({
            ...item,
            placeholder: dynamicBlurDataColor(),
            isAura: false,
          }));
          setPagePin(pagePin + 1);
        } else if (type === MasonryType.Search) {
          setHasMoreData(false);
          return;
        }
      }
      if (res.data) {
        pins = res.data.map(
          (item) =>
            ({
              author: "",
              download_url: item.media.url,
              id: item.id,
              placeholder: dynamicBlurDataColor(),
              height: item.media.height,
              width: item.media.width,
              url: item.media.url,
              isAura: true,
            } as Photo)
        );
      }

      const newData = [...data, ...pins];
      setData(newData);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (inView && !isLoading && hasMoreData) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isLoading, hasMoreData, q]);

  return (
    <>
      {isClient && (
        <div className="w-full">
          <MasonicColumns data={data} />
          <section className="flex justify-center items-center w-full mt-20">
            <div ref={ref}></div>
          </section>
        </div>
      )}
    </>
  );
};

export default MasonryInfinityScroll;
