import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PinForm from "@/components/global/PinForm";
import { handleListBoardsByUser } from "@/actions/pins";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Suspense } from "react";
import { BoardType } from "@/constants";

const CreatePinTool = async () => {
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handleListBoardsByUser({
    user_id: "",
    isPrivate: "true",
    access_token,
  });

  if (!res.data) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create a New Pin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-xl font-bold">
              You need to create a board first to create a pin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create a New Pin
          </CardTitle>
        </CardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <CardContent>
            <PinForm
              boards={res.data.filter(
                (item) => item.type !== BoardType.AllPins
              )}
            />
          </CardContent>
        </Suspense>
      </Card>
    </div>
  );
};

export default CreatePinTool;
