"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Suggestion } from "@/types/pin";
import { handleListSuggestions } from "@/actions/suggestion";
import { getCookie } from "cookies-next";
import { useDebounce } from "@uidotdev/usehooks";

const formSchema = z.object({
  q: z.string().min(2).max(50),
});

const ideas = [
  { name: "Anime", image: "/assets/yuki.jpg" },
  { name: "Sport", image: "/assets/sport.jpg" },
  { name: "Manhua", image: "/assets/P_19.jpg" },
  {
    name: "Game",
    image: "/assets/shorekeeper.jpg",
  },
  { name: "Trang phục", image: "/assets/trangphuc.jpg" },
  { name: "Hài hước", image: "/assets/haihuoc.jpg" },
];

const SearchPin = () => {
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const debouncedQuery = useDebounce(searchTerm, 300);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
    },
  });

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setIsLoading(true);
        const res = await handleListSuggestions({
          keyword: debouncedQuery,
          access_token,
        });

        if (res.data) {
          setSuggestions(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isOpen) {
      fetchSuggestions();
    }
  }, [access_token, debouncedQuery, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSearch(values.q);
  }

  const handleSearch = (q: string) => {
    router.push(`/search?q=${q}`);
    router.refresh();
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (searchTerm) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-full mx-10">
      <Input
        type="search"
        placeholder="Search ideas... (Press ⌘K)"
        className="pr-10"
        onFocus={handleInputFocus}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="w-5 h-5" />
      </Button>
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[1200px] h-[450px] rounded-2xl">
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-lg font-semibold">
                Search Ideas
              </DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="q"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="search"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => {
                              handleInputChange(e);
                              field.onChange(e);
                            }}
                            autoFocus
                            autoComplete="off"
                            className="mb-4"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <ScrollArea className="max-h-[272px]">
                {!showSuggestions && !searchTerm && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ideas.map((idea, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-32 flex items-center rounded-lg justify-center p-0"
                        onClick={() => {
                          handleSearch(idea.name);
                        }}
                      >
                        <div className="flex-1 h-full w-1/2">
                          <Image
                            src={idea.image}
                            alt={idea.name}
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                          />
                        </div>
                        <div className="text-sm text-center flex-1">
                          {idea.name}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
                {showSuggestions && searchTerm && (
                  <ul className="space-y-2">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="p-2 hover:bg-muted-foreground rounded cursor-pointer"
                        onClick={() => {
                          setSearchTerm(suggestion.name);
                          handleSearch(suggestion.name);
                          setShowSuggestions(true);
                        }}
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
              </ScrollArea>
            </div>
            <DialogDescription></DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchPin;
