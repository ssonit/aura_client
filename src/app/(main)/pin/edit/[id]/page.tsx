import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PinForm from "@/components/global/PinForm";
import { handleListBoardsByUser, handlePinDetail } from "@/actions/pins";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Suspense } from "react";

const EditPin = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handleListBoardsByUser(access_token);
  const resPin = await handlePinDetail(id, access_token);
  if (!resPin.data) return <div>Pin not found</div>;

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
              boards={res.data}
              initData={{
                title: resPin.data.title,
                description: resPin.data.description,
                imageUrl: resPin.data.media.url,
                linkUrl: resPin.data.link_url,
                selectedBoard: "",
              }}
            />
          </CardContent>
        </Suspense>
      </Card>
    </div>
  );
};

export default EditPin;
