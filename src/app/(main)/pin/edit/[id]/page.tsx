import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PinForm from "@/components/global/PinForm";
import { handleBoardPinDetail, handleListBoardsByUser } from "@/actions/pins";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Suspense } from "react";
import { BoardType } from "@/constants";
import SoftDeletePinModal from "@/components/pin/SoftDeletePinModal";

const EditPin = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handleListBoardsByUser({
    user_id: "",
    isPrivate: "true",
    access_token,
  });
  const resBoardPin = await handleBoardPinDetail({
    pin_id: id,
    access_token,
  });
  if (!resBoardPin.data) return <div>Pin not found</div>;

  const { pin, board_id, id: board_pin_id } = resBoardPin.data;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Edit Pin
          </CardTitle>
        </CardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <CardContent>
            <PinForm
              boards={res.data.filter(
                (item) => item.type !== BoardType.AllPins
              )}
              initData={{
                title: pin.title,
                description: pin.description,
                imageUrl: "",
                linkUrl: pin.link_url,
                selectedBoard: board_id,
                pin_id: id,
                board_pin_id: board_pin_id,
              }}
            />
          </CardContent>
        </Suspense>
      </Card>
      {pin ? (
        <SoftDeletePinModal
          pinId={pin.id}
          pinName={pin.title}
        ></SoftDeletePinModal>
      ) : null}
    </div>
  );
};

export default EditPin;
