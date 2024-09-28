"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MarketingForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    router.push(`/register?email=${email}`);
  }
  return (
    <form className="flex space-x-2 items-center" onSubmit={handleSubmit}>
      <Input
        className="max-w-lg flex-1"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Sign up</Button>
    </form>
  );
};

export default MarketingForm;
