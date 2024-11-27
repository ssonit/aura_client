"use client";
import PinManagement from "@/components/admin/PinManagement";
import { Suspense } from "react";

const AdminPins = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PinManagement></PinManagement>
      </Suspense>
    </div>
  );
};

export default AdminPins;
