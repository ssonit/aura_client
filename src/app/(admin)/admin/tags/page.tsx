"use client";
import TagManagement from "@/components/admin/TagManagement";
import { Suspense } from "react";

const AdminTags = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TagManagement></TagManagement>
      </Suspense>
    </div>
  );
};

export default AdminTags;
