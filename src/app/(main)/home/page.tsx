import { fetchPins } from "@/actions/pins";
import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { dynamicBlurDataUrl } from "@/utils/helpers";

const HomePage = async () => {
  const data = await fetchPins(1, 20);
  const newData = data.map(async (item) => ({
    ...item,
    placeholder: await dynamicBlurDataUrl(item.download_url),
  }));
  const photos = await Promise.all(newData);
  return (
    <main className="bg-muted/40 py-6 md:py-12 flex-1">
      <div className="container mx-auto md:px-6">
        <MasonryInfinityScroll initData={photos} />
      </div>
    </main>
  );
};

export default HomePage;
