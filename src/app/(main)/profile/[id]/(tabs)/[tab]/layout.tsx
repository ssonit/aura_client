import AddBoardModal from "@/components/global/AddBoardModal";
import InfoProfile from "@/components/profile/InfoProfile";
import ProfileActions from "@/components/profile/ProfileActions";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { Tab } from "@/constants";

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string; tab: Tab };
}) {
  const { id, tab } = params;
  return (
    <div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoProfile id={id}></InfoProfile>

        <ProfileTabs tab={tab}></ProfileTabs>

        <ProfileActions id={id}></ProfileActions>

        {children}
      </main>

      <AddBoardModal></AddBoardModal>
    </div>
  );
}
