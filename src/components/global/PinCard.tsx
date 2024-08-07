"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { EyeIcon, SaveIcon, ShareIcon } from "lucide-react";

interface Prop {
  item: any;
}

const PinCard = ({ item }: Prop) => {
  return (
    <div className="w-full break-inside-avoid" id="pin_card">
      <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
        <div className="min-h-[120px]">
          <div className="relative max-w-full h-full">
            <Image
              src={item.download_url}
              alt={item.id}
              sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
              width={100}
              height={100}
              quality={75}
              loading="lazy"
              fetchPriority="auto"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
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
