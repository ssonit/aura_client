import { pinApiRequest } from "@/actions/pin";
import { fetchPins } from "@/actions/pins";
import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { dynamicBlurDataUrl } from "@/utils/helpers";
import { cookies } from "next/headers";

const HomePage = async () => {
  const data = await fetchPins(1, 20);
  const newData = data.map(async (item) => ({
    ...item,
    placeholder: await dynamicBlurDataUrl(item.download_url),
  }));
  const photos = await Promise.all(newData);

  const cookieStore = cookies();
  const access_token = cookieStore.get("token")?.value as string;
  const refresh_token = cookieStore.get("refreshToken")?.value as string;

  const pins = await pinApiRequest.handleListPins({
    page: 1,
    limit: 20,
    access_token: access_token,
    refresh_token: refresh_token,
  });

  console.log(pins);

  return (
    <main className="bg-muted/40 py-6 md:py-12 flex-1">
      <div className="container mx-auto md:px-6">
        <MasonryInfinityScroll initData={photos} />
      </div>
    </main>
  );
};

export default HomePage;
