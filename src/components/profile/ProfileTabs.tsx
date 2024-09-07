"use client";

import { Button } from "@/components/ui/button";
import { Tab } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const ProfileTabs = ({ tab }: { tab: Tab }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirect = (from: Tab, to: Tab): void => {
    const newPath = pathname.replace(from, to);

    router.push(newPath);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant={tab === Tab.Created ? "secondary" : "outline"}
        className="border-none"
        onClick={() => handleRedirect(Tab.Saved, Tab.Created)}
      >
        Created
      </Button>
      <Button
        variant={tab === Tab.Saved ? "secondary" : "outline"}
        className="border-none"
        onClick={() => handleRedirect(Tab.Created, Tab.Saved)}
      >
        Saved
      </Button>
    </div>
  );
};

export default ProfileTabs;
