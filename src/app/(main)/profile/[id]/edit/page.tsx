import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { handleGetUser } from "@/actions/user";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const access_token = getCookie("access_token", { cookies }) as string;
  const res = await handleGetUser(id, access_token);
  const user = res.data;
  if (!user)
    return (
      <div className="text-center mt-8 flex flex-col gap-6">
        <p>User not found</p>
        <Link href={`/home`}>
          <Button>Go back home</Button>
        </Link>
      </div>
    );
  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <EditProfileForm
        initData={{
          avatar: user.avatar.url,
          username: user.username,
          bio: user.bio,
          website: user.website,
        }}
      ></EditProfileForm>
    </Card>
  );
};

export default EditProfilePage;
