import ContentProfile from "@/components/profile/ContentProfile";
import { Tab } from "@/constants";

const ProfilePage = ({ params }: { params: { tab: Tab; id: string } }) => {
  const { tab, id } = params;

  return (
    <div>{tab === Tab.Saved && <ContentProfile id={id}></ContentProfile>}</div>
  );
};

export default ProfilePage;
