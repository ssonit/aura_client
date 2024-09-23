"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { Plus, Settings2 } from "lucide-react";
import { Suspense } from "react";

const ProfileActions = ({ id }: { id: string }) => {
  const { handleModalOpen, user } = useAppContext();
  return (
    <Suspense fallback={<div className="h-10 w-full"></div>}>
      {user && id === user.id ? (
        <div className="flex items-center justify-between my-4">
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <Settings2 className="w-6 h-6"></Settings2>
          </Button>
          <Button
            onClick={() => handleModalOpen(true)}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
          >
            <Plus className="w-6 h-6"></Plus>
          </Button>
        </div>
      ) : (
        <div className="mt-5"></div>
      )}
    </Suspense>
  );
};

export default ProfileActions;
