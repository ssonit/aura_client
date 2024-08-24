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
      size={"icon"}
      className="flex items-center justify-center rounded-full"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
