"use client";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import CustomImage from "@/components/global/CustomImage";
import { Photo } from "@/types/pin";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/app-provider";
import { BoardType } from "@/constants";

interface Props {
  item: Photo;
  boardType: string;
}

const BoardPinCard = ({ item, boardType }: Props) => {
  const router = useRouter();
  const { handleModalBoardPinEdit } = useAppContext();
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
            {boardType !== BoardType.AllPins ? (
              <Button
                className="z-30 group-hover:opacity-100 transition-opacity rounded-full"
                size="icon"
                variant="secondary"
                onClick={() => {
                  handleModalBoardPinEdit({
                    user_id_pin: item.user_id_pin as string,
                    pinId: item.id,
                    boardPinId: item.board_pin_id as string,
                    url: item.url,
                  });
                }}
              >
                <Pen className="w-4 h-4"></Pen>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPinCard;
