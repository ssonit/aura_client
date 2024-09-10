import { handleListPins } from "@/actions/pins";
import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const HomePage = async () => {
  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListPins(1, 20, access_token, {
    sort: "desc",
  });

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
        <MasonryInfinityScroll initData={pins} />
      </div>
    </main>
  );
};

export default HomePage;
