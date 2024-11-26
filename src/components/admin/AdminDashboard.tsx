"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { usePathname, useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(() => {
    if (pathname.includes("pins")) return "pins";
    if (pathname.includes("tags")) return "tags";
    else return "users";
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === "users") router.push(`/admin`);
          else router.push(`/admin/${value}`);
          setActiveTab(value);
        }}
      >
        <TabsList className="my-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pins">Pins</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
