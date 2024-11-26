"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ListBoardHome = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(1);
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "All pins",
    },
    {
      id: 2,
      title: "Anime",
    },
    {
      id: 3,
      title: "Sport",
    },
    {
      id: 4,
      title: "Laptop",
    },
    {
      id: 5,
      title: "Home Decor",
    },
    {
      id: 6,
      title: "Fashion",
    },
  ]);

  return (
    <div className="mb-6 mt-3 flex items-center gap-4">
      {categories.map((item) => (
        <div key={item.id}>
          <Button
            onClick={() => {
              if (item.id === 1) router.push("/home");
              else router.push(`/search?q=${item.title}`);
            }}
            variant={"ghost"}
            className={cn(
              "hover:bg-[#00214c]",
              selected === item.id ? "bg-[#00214c]" : null
            )}
          >
            {item.title}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ListBoardHome;
