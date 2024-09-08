import AddBoardModal from "@/components/global/AddBoardModal";
import InfoProfile from "@/components/profile/InfoProfile";
import ProfileActions from "@/components/profile/ProfileActions";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoProfile id={id}></InfoProfile>

        <ProfileActions></ProfileActions>
      </main>

      <AddBoardModal></AddBoardModal>
    </div>
  );
};

export default ProfilePage;
