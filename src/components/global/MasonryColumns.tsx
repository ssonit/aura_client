"use client";

import { useEffect, useState } from "react";
import Masonry from "react-layout-masonry";

const MasonryColumns = ({ data }: { data: JSX.Element[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 5 }} gap={16}>
          {data}
        </Masonry>
      )}
      {/* <section className="pin_container">
        {data}
        <PinCard
          item={{
            id: "11",
            author: "Alejandro Escamilla",
            width: 564,
            height: 1128,
            url: "https://i.pinimg.com/564x/89/92/db/8992db07fea89dbaff9f7ac6f8853b65.jpg",
            download_url:
              "https://i.pinimg.com/564x/89/92/db/8992db07fea89dbaff9f7ac6f8853b65.jpg",
          }}
          index={11}
          key={11}
        />
        <PinCard
          item={{
            id: "12",
            author: "Alejandro Escamilla",
            width: 564,
            height: 1128,
            url: "https://i.pinimg.com/236x/4b/d0/c1/4bd0c14b8828a9aeff5fdf85ddc9286d.jpg",
            download_url:
              "https://i.pinimg.com/236x/4b/d0/c1/4bd0c14b8828a9aeff5fdf85ddc9286d.jpg",
          }}
          index={12}
          key={12}
        />

        <PinCard
          item={{
            id: "13",
            author: "Alejandro Escamilla",
            width: 564,
            height: 1128,
            url: "https://i.pinimg.com/236x/a7/7d/6f/a77d6f7409fd9a1c16090360b84fa692.jpg",
            download_url:
              "https://i.pinimg.com/236x/a7/7d/6f/a77d6f7409fd9a1c16090360b84fa692.jpg",
          }}
          index={13}
          key={13}
        />
        <PinCard
          item={{
            id: "14",
            author: "Alejandro Escamilla",
            width: 564,
            height: 1128,
            url: "https://i.pinimg.com/474x/37/36/54/373654fffa6e0fe291c42cffd62bc297.jpg",
            download_url:
              "https://i.pinimg.com/474x/37/36/54/373654fffa6e0fe291c42cffd62bc297.jpg",
          }}
          index={14}
          key={14}
        />
      </section> */}
    </>
  );
};

export default MasonryColumns;
