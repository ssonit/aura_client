"use client";

import { lazy, memo, Suspense } from "react";

const CurrentUserProfile = lazy(() => import("./CurrentUserProfile"));

const ContentProfile = ({ id }: { id: string }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CurrentUserProfile id={id}></CurrentUserProfile>
      </Suspense>
    </div>
  );
};

export default memo(ContentProfile);
