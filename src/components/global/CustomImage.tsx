"use client";

import { staticBlurDataUrl } from "@/utils/helpers";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

const CustomImage = ({ src, alt, placeholder, width, height }: Props) => {
  return (
    <div className="relative w-full">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
        quality={75}
        width={width || 257}
        height={height || 171}
        loading="lazy"
        placeholder="blur"
        blurDataURL={placeholder || staticBlurDataUrl()}
        className="image"
        style={{
          position: "relative",
          width: "100%",
        }}
      />
    </div>
  );
};

export default CustomImage;
