import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImagePreviewProps {
  url: string;
  onRemove: () => void;
  onSelectFile?: () => void;
}

const ImagePreview = ({ url, onRemove, onSelectFile }: ImagePreviewProps) => {
  if (!url) {
    return (
      <button className="w-full h-[454px]" type="button" onClick={onSelectFile}>
        <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="relative w-full h-[454px]">
        <Image
          src={url}
          alt="Preview"
          className="w-full h-full object-cover rounded-lg"
          fill
          sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
          priority
        />
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 z-40"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImagePreview;
