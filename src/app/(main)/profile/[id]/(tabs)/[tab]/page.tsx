import { Tab } from "@/constants";
import { lazy, Suspense } from "react";

const CreatedPinProfile = lazy(
  () => import("@/components/profile/CreatedPinProfile")
);
const SavedPinProfile = lazy(
  () => import("@/components/profile/SavedPinProfile")
);

const ProfilePage = ({ params }: { params: { tab: Tab; id: string } }) => {
  const { tab, id } = params;

  const content = {
    [Tab.Saved]: <SavedPinProfile id={id}></SavedPinProfile>,
    [Tab.Created]: <CreatedPinProfile id={id}></CreatedPinProfile>,
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{content[tab]}</Suspense>
    </div>
  );
};

export default ProfilePage;
