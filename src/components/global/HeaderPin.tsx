import { Button } from "@/components/ui/button";
import { ImageIcon, UploadIcon } from "lucide-react";
import Link from "next/link";
import HeaderAvatar from "./HeaderAvatar";
import SearchPin from "./SearchPin";

const HeaderPin = () => {
  return (
    <header className="bg-background fixed z-[100] w-full border-b px-4 md:px-6 py-3 flex items-center justify-between">
      <Link
        href="/home"
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <div className="flex items-center gap-2">
          <ImageIcon className="w-8 h-8 text-red-400" />
          <h1 className="text-2xl font-bold px-1 text-red-400">Aura</h1>
        </div>
      </Link>
      <SearchPin></SearchPin>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Link href="/pin/creation" prefetch={false}>
              <UploadIcon className="w-5 h-5" />
              <span className="sr-only">Upload</span>
            </Link>
          </Button>
          <HeaderAvatar></HeaderAvatar>
        </div>
      </div>
    </header>
  );
};

export default HeaderPin;
