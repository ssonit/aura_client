import { Button } from "../ui/button";
import { EyeIcon, SaveIcon, ShareIcon } from "lucide-react";
import CustomImage from "./CustomImage";
import { Photo } from "@/types/pin";

interface Props {
  item: Photo;
}

const PinCard = ({ item }: Props) => {
  return (
    <div className="w-full" id="pin_card">
      <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
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
          <Button variant="ghost" size="icon" className="text-white">
            <EyeIcon className="w-5 h-5" />
            <span className="sr-only">View</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <SaveIcon className="w-5 h-5" />
            <span className="sr-only">Save</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PinCard;
