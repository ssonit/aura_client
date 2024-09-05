import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PinForm from "@/components/global/PinForm";
import { handleListBoardsByUser } from "@/actions/pins";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Suspense } from "react";

const CreatePinTool = async () => {
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handleListBoardsByUser(access_token);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send the data to your backend
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("linkUrl", linkUrl);
  //   formData.append("board", selectedBoard);

  //   if (imageFile) {
  //     formData.append("image", imageFile);
  //   } else if (imageUrl) {
  //     formData.append("imageUrl", imageUrl);
  //   }
  //   console.log(Object.fromEntries(formData));

  //   // Reset form after submission
  //   setTitle("");
  //   setDescription("");
  //   setImageUrl("");
  //   setImageFile(null);
  //   setLinkUrl("");
  //   setSelectedBoard("");
  //   if (fileInputRef.current) fileInputRef.current.value = "";
  //   alert("Pin created successfully!");
  // };
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
            <PinForm boards={res.data} />
          </CardContent>
        </Suspense>
      </Card>
    </div>
  );
};

export default CreatePinTool;
