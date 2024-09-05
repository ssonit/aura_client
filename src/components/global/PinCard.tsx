"use client";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import CustomImage from "./CustomImage";
import { Photo } from "@/types/pin";
import { useRouter } from "next/navigation";

interface Props {
  item: Photo;
}

const PinCard = ({ item }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full" id="pin_card">
      <div
        className="relative group overflow-hidden rounded-2xl cursor-zoom-in"
        onClick={() => {
          if (item.isAura) {
            router.push(`/pin/${item.id}`);
          }
        }}
      >
        <div className="relative">
          <CustomImage
            src={item.download_url}
            alt={item.id}
            placeholder={item.placeholder}
            width={item.width}
            height={item.height}
          ></CustomImage>
        </div>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-1 right-1">
            <Button variant="destructive" size="icon" className="text-white">
              <SaveIcon className="w-5 h-5" />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinCard;
