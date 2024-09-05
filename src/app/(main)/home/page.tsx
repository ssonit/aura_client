import { fetchPins, handleListPins } from "@/actions/pins";
import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const HomePage = async () => {
  const data = await fetchPins(1, 20);
  const photos = data.map((item) => ({
    ...item,
    placeholder: dynamicBlurDataColor(),
    isAura: false,
  }));

  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListPins(1, 20, access_token);

  const pins = res.data.map(
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

  return (
    <main className="bg-muted/40 py-6 md:py-12 flex-1">
      <div className="container mx-auto md:px-6">
        <MasonryInfinityScroll initData={[...pins, ...photos]} />
      </div>
    </main>
  );
};

export default HomePage;
