"use client";

import { useAppContext } from "@/contexts/app-provider";
import { lazy, memo, Suspense, useMemo } from "react";

const CurrentUserProfile = lazy(() => import("./CurrentUserProfile"));
const VisitorProfile = lazy(() => import("./VisitorProfile"));

const ContentProfile = ({ id }: { id: string }) => {
  const { user } = useAppContext();
  const isProfile = useMemo(() => user?.id === id, [user, id]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {isProfile ? (
          <CurrentUserProfile></CurrentUserProfile>
        ) : (
          <VisitorProfile></VisitorProfile>
        )}
      </Suspense>
    </div>
  );
};

export default memo(ContentProfile);
