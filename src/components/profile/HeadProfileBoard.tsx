"use client";

import { BoardType } from "@/constants";
import DropdownProfileBoard from "./DropdownProfileBoard";
import BackButton from "@/components/global/BackButton";

const HeadProfileBoard = ({ name, type }: { name: string; type: string }) => {
  return (
    <div className="flex items-center gap-3 justify-center relative">
      <div className="absolute top-0 left-16">
        <BackButton></BackButton>
      </div>
      <h3 className="font-bold text-3xl">{name}</h3>
      {type !== BoardType.AllPins && (
        <DropdownProfileBoard></DropdownProfileBoard>
      )}
    </div>
  );
};

export default HeadProfileBoard;
