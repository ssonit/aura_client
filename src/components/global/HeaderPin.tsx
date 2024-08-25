import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import Link from "next/link";
import HeaderAvatar from "./HeaderAvatar";

const HeaderPin = () => {
  return (
    <header className="bg-background fixed z-[100] w-full border-b px-4 md:px-6 py-3 flex items-center justify-between">
      <Link
        href="/home"
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <div className="flex items-center gap-2">
          <ImageIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold px-1">Aura</h1>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <form className="relative w-full max-w-md">
          <Input
            type="search"
            placeholder="Search images..."
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
        </form>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Link href="/pin/creation" prefetch={false}>
              <UploadIcon className="w-5 h-5" />
              <span className="sr-only">Upload</span>
            </Link>
          </Button>
          <HeaderAvatar></HeaderAvatar>
          {/* <div>
          <Button variant="outline">
            <Link href="/login" prefetch={false}>
              Sign In
            </Link>
          </Button>
          <Button>
            <Link href="/register" prefetch={false}>
              Sign Up
            </Link>
          </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderPin;
