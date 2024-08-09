import { fetchPins } from "@/actions/pins";
import MasonryInfinityScroll from "@/components/global/MasonryInfinityScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  const data = await fetchPins(1, 20);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b px-4 md:px-6 py-3 flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
          prefetch={false}
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Aura</h1>
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
              <UploadIcon className="w-5 h-5" />
              <span className="sr-only">Upload</span>
            </Button>
            <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="bg-muted/40 py-6 md:py-12 flex-1">
        <div className="container mx-auto md:px-6">
          <MasonryInfinityScroll initData={data} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
