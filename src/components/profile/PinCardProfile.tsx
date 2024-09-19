"use client";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import CustomImage from "@/components/global/CustomImage";
import { Photo } from "@/types/pin";
import { useRouter } from "next/navigation";

interface Props {
  item: Photo;
}

const PinCardProfile = ({ item }: Props) => {
  const router = useRouter();
  const handleCardClick = () => {
    if (item.isAura) {
      router.push(`/pin/${item.id}`);
    }
  };
  return (
    <div className="w-full" id="pin_card">
      <div className="relative group overflow-hidden rounded-2xl">
        <div className="relative cursor-zoom-in" onClick={handleCardClick}>
          <CustomImage
            src={item.download_url}
            alt={item.id}
            placeholder={item.placeholder}
            width={item.width}
            height={item.height}
          />
        </div>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-1 right-1 pointer-events-auto">
            <Button
              className="z-30 group-hover:opacity-100 transition-opacity rounded-full"
              size="icon"
              variant="secondary"
              onClick={() => {
                router.push(`/pin/edit/${item.id}`);
              }}
            >
              <Pen className="w-4 h-4"></Pen>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinCardProfile;
