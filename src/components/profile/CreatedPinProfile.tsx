import MasonryCreatedPin from "@/components/profile/MasonryCreatedPin";
import { handleListPins } from "@/actions/pins";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { memo } from "react";

const CreatedPinProfile = async ({ id }: { id: string }) => {
  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListPins(1, 20, access_token, {
    user_id: id,
    sort: "desc",
  });

  if (!res.data)
    return (
      <div className="text-center justify-center mt-10">
        Nothing to show...yet! Pins you create will live here.
      </div>
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
  console.log("created");
  return (
    <main className="flex-1">
      <div className="mx-auto">
        <MasonryCreatedPin initData={pins} user_id={id}></MasonryCreatedPin>
      </div>
    </main>
  );
};

export default memo(CreatedPinProfile);
