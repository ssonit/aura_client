import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Share, MoreHorizontal, Download } from "lucide-react";
import Image from "next/image";
import BackButton from "@/components/global/BackButton";
import { handlePinDetail } from "@/actions/pins";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import PinDetail from "@/components/pin/PinDetail";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handlePinDetail(id, access_token);
  const data = res.data;
  if (!data) return null;
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
      <div className="mt-12 container">
        <h2 className="text-2xl font-bold mb-6 text-center">More like this</h2>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="relative group">
              <Image
                src={`https://picsum.photos/seed/picsum/200/300`}
                alt={`Related Pin ${i + 1}`}
                className="rounded-lg w-full h-auto object-cover"
                width={200}
                height={200 + i * 20}
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Save
              </Button>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default DetailPage;
