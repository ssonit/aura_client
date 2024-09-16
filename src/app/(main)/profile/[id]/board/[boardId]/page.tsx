import { handleBoardItem, handleListBoardPin } from "@/actions/pins";
import MasonryBoardPin from "@/components/global/MasonryBoardPin";
import UpdateBoardModal from "@/components/global/UpdateBoardModal";
import DropdownProfileBoard from "@/components/profile/DropdownProfileBoard";
import { Button } from "@/components/ui/button";
import { BoardType } from "@/constants";
import { cn } from "@/lib/utils";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

const ListPinInBoard = async ({ params }: { params: { boardId: string } }) => {
  const { boardId } = params;
  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListBoardPin(1, 10, boardId, access_token);
  const resBoardItem = await handleBoardItem(boardId, access_token);

  console.log(Array.isArray(res.data));
  const listBoardPin = res.data === null ? [] : res.data;

  if (!listBoardPin || !resBoardItem.data)
    return <div className="mt-10 text-center font-bold">Not Found</div>;

  const pins = listBoardPin.map(
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

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 justify-center">
        <h3 className="font-bold text-3xl">{resBoardItem.data.name}</h3>
        {resBoardItem.data.type !== BoardType.AllPins && (
          <DropdownProfileBoard></DropdownProfileBoard>
        )}
      </div>
      <div
        className={cn({
          "mt-10": pins.length === 0,
          "mt-28": pins.length > 0,
        })}
      >
        <div className="container mx-auto md:px-6">
          {pins.length === 0 && (
            <div className="container mx-auto md:px-6 text-center">
              <div>You haven&apos;t saved any Pins yet</div>
              <Button className="mt-6" asChild>
                <Link href={"/home"}>Find Idea</Link>
              </Button>
            </div>
          )}
          {pins.length > 0 && (
            <MasonryBoardPin initData={pins} boardId={boardId} />
          )}
        </div>
      </div>
      <UpdateBoardModal board={resBoardItem.data}></UpdateBoardModal>
    </div>
  );
};

export default ListPinInBoard;
