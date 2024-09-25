import { handleListPins } from "@/actions/pins";
import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { Button } from "@/components/ui/button";
import { MasonryType, SortType } from "@/constants";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

const SearchPinPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const q = searchParams["q"] ?? "";

  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListPins(1, 20, access_token, {
    sort: SortType.Desc,
    keyword: q,
  });

  if (!res.data)
    return (
      <main className="bg-muted/40 py-6 md:py-12 flex-1 min-h-screen">
        <div className="container mx-auto md:px-6">
          <div className="text-center text-xl font-bold text-white">
            <div className="mb-4">
              {" "}
              No results found for{" "}
              <span className="text-primary text-2xl">{q}</span>
            </div>
            <Button asChild>
              <Link href={"/home"}>Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    );

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
    <main className="bg-muted/40 py-6 md:py-12 flex-1 min-h-screen">
      <div className="container mx-auto md:px-6">
        <MasonryInfinityScroll
          initData={pins}
          q={q as string}
          type={MasonryType.Search}
        />
      </div>
    </main>
  );
};

export default SearchPinPage;
