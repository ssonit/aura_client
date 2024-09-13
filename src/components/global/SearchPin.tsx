"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchPin = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [pins, setPins] = useState<any[]>([
    {
      id: 1,
      name: "Pin 1",
    },
  ]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="relative w-full max-w-full mx-10">
      <Input
        type="search"
        placeholder="Search..."
        className="pr-10"
        value={searchInput}
        onChange={handleInputChange}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="w-5 h-5" />
      </Button>
      {pins.length > 0 && searchInput && (
        <div className="absolute left-0 top-full mt-1 w-full">
          <ScrollArea>
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                {pins.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                <CommandGroup heading="Kết quả tìm kiếm">
                  {pins.map((item) => (
                    <CommandItem
                      className="cursor-pointer p-0 hover:bg-accent hover:text-accent-foreground"
                      key={item.id}
                    >
                      <div
                        onClick={() => {
                          setSearchInput("");
                          setPins([]);
                        }}
                        className="w-full px-2 py-1.5"
                      >
                        {item.name}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchPin;
