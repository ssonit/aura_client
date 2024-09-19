"use client";
import { Button } from "@/components/ui/button";
import { Heart, SaveIcon } from "lucide-react";
import CustomImage from "./CustomImage";
import { Photo } from "@/types/pin";
import { useRouter } from "next/navigation";

interface Props {
  item: Photo;
}

const PinCard = ({ item }: Props) => {
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
          <div className="absolute top-1.5 right-1.5 pointer-events-auto">
            <Button
              variant={"white"}
              size="icon"
              className="text-white rounded-full"
              onClick={() => {
                // Logic của button
              }}
            >
              <Heart className="w-5 h-5 stroke-red-500" />
              <span className="sr-only">Like</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinCard;
