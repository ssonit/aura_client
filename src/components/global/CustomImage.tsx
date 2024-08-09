"use client";

import { staticBlurDataUrl } from "@/utils/helpers";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  placeholder?: string;
}

const CustomImage = ({ src, alt, placeholder }: Props) => {
  return (
    <div className="relative w-full">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
        quality={75}
        width={100}
        height={150}
        loading="lazy"
        placeholder="blur"
        blurDataURL={placeholder || staticBlurDataUrl()}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default CustomImage;
