"use client";
import UserManagement from "@/components/admin/UserManagement";
import { Suspense } from "react";

const AdminPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserManagement></UserManagement>
      </Suspense>
    </div>
  );
};

export default AdminPage;
