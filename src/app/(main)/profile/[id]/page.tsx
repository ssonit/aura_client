import AddBoardModal from "@/components/global/AddBoardModal";
import InfoProfile from "@/components/profile/InfoProfile";
import ProfileActions from "@/components/profile/ProfileActions";
import ContentProfile from "@/components/profile/ContentProfile";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const access_token = getCookie("access_token", { cookies }) as string;
  if (!access_token) return redirect("/login");
  return (
    <div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoProfile id={id}></InfoProfile>

        <ProfileActions></ProfileActions>

        <ContentProfile id={id}></ContentProfile>
      </main>

      <AddBoardModal></AddBoardModal>
    </div>
  );
};

export default ProfilePage;
