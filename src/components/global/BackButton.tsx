"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Button
      variant="white"
      onClick={handleBack}
      className="flex items-center justify-center rounded-full p-0 w-12 h-12"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
