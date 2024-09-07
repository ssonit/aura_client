"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import MasonicColumns from "./MasonicColumns";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { handleListBoardPin } from "@/actions/pins";
import { getCookie } from "cookies-next";

let page = 2;

const MasonryBoardPin = ({
  initData,
  boardId,
}: {
  initData: Photo[];
  boardId: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });

  const [data, setData] = useState<Photo[]>(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Trạng thái kiểm soát
  const access_token = getCookie("access_token") as string;

  async function fetchData() {
    try {
      setIsLoading(true);
      let pins: Photo[] = [];
      const res = await handleListBoardPin(page, 10, boardId, access_token);
      if (!res.data) {
        setHasMoreData(false);
        return;
      }
      if (res.data) {
        pins = res.data.map(
          (item) =>
            ({
              author: "",
              download_url: item.media.url,
              height: item.media.height,
              width: item.media.width,
              url: item.media.url,
              id: item.pin_id,
              placeholder: dynamicBlurDataColor(),
              isAura: true,
            } as Photo)
        );
      }

      const newData = [...data, ...pins];
      setData(newData);
      page++;
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
  }, [inView, isLoading, hasMoreData]);

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

export default MasonryBoardPin;
