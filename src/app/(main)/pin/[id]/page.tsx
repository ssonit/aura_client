import Image from "next/image";
import { handleListPins, handlePinDetail } from "@/actions/pins";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import dynamic from "next/dynamic";
import RelatedPins from "@/components/pin/RelatedPins";

const BackButton = dynamic(() => import("@/components/global/BackButton"), {
  ssr: false,
});

const PinDetail = dynamic(() => import("@/components/pin/PinDetail"), {
  ssr: false,
});

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handlePinDetail(id, access_token);
  const resListPins = await handleListPins(1, 20, access_token, {
    sort: "desc",
  });
  const data = res.data;
  if (!data || !resListPins.data) return null;

  const pins = resListPins.data.map(
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
    <div className="mx-auto px-2 py-8">
      <div className="fixed z-[100] pl-4">
        <BackButton></BackButton>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl max-w-[1016px] mx-auto">
        <div className="md:w-1/2">
          <div className="relative rounded-xl">
            <Image
              src={
                data.media.url
                  ? data.media.url
                  : "https://i.pinimg.com/originals/47/d2/d8/47d2d8fb5b55f27eb7b6d0421c374097.jpg"
              }
              alt="Pin Image"
              className="rounded-xl w-full h-auto object-cover"
              priority
              width={600}
              height={800}
            />
          </div>
        </div>

        {/* Pin Details */}
        <PinDetail data={data} />
      </div>

      {/* Related Pins */}
      <RelatedPins pins={pins}></RelatedPins>
    </div>
  );
};

export default DetailPage;
