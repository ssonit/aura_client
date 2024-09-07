import { handleBoardItem, handleListBoardPin } from "@/actions/pins";
import MasonryBoardPin from "@/components/global/MasonryBoardPin";
import UpdateBoardModal from "@/components/global/UpdateBoardModal";
import DropdownProfileBoard from "@/components/profile/DropdownProfileBoard";
import { Photo } from "@/types/pin";
import { dynamicBlurDataColor } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const ListPinInBoard = async ({ params }: { params: { boardId: string } }) => {
  const { boardId } = params;
  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListBoardPin(1, 10, boardId, access_token);
  const resBoardItem = await handleBoardItem(boardId, access_token);

  if (!res.data || !resBoardItem.data)
    return <div className="text-center justify-center mt-10">Not found</div>;

  const pins = res.data?.map(
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
        <DropdownProfileBoard></DropdownProfileBoard>
      </div>
      <div className="mt-28">
        <div className="container mx-auto md:px-6">
          <MasonryBoardPin initData={pins} boardId={boardId} />
        </div>
      </div>
      <UpdateBoardModal board={resBoardItem.data}></UpdateBoardModal>
    </div>
  );
};

export default ListPinInBoard;
