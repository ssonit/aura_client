import { handleListBoardPin } from "@/actions/pins";
import DropdownProfileBoard from "@/components/profile/DropdownProfileBoard";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const ListPinInBoard = async ({ params }: { params: { boardId: string } }) => {
  const { boardId } = params;
  const access_token = getCookie("access_token", { cookies }) as string;

  const res = await handleListBoardPin(boardId, access_token);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 justify-center">
        <h3 className="font-bold text-3xl">Wuwa {boardId}</h3>
        <DropdownProfileBoard></DropdownProfileBoard>
      </div>
      <div className="mt-32"></div>
    </div>
  );
};

export default ListPinInBoard;
