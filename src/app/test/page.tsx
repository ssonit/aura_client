"use client";

import { useRef, useState, useCallback } from "react";
import * as nsfwjs from "nsfwjs"; // Import NSFWJS

const TestPage = () => {
  const [isNSFW, setIsNSFW] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
      setFile(selectedFile);

      // Sử dụng FileReader để chuyển hình ảnh sang base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = async () => {
          // Load mô hình NSFWJS và kiểm tra hình ảnh
          const model = await nsfwjs.load();
          const predictions = await model.classify(img);

          // Kiểm tra nếu có NSFW thì đặt cờ `isNSFW`
          const nsfwContent =
            predictions.find(
              (prediction) =>
                prediction.className === "Porn" ||
                prediction.className === "Hentai" ||
                prediction.className === "Sexy"
            )?.probability || 0;

          console.log(nsfwContent, "nsfwContent");

          setIsNSFW(nsfwContent > 0.5);
        };
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  console.log(isNSFW, "isNSFW");
  return (
    <form>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleSelectFile}
      />
      {isNSFW && (
        <p className="text-red-500">
          This image contains NSFW content and cannot be uploaded.
        </p>
      )}
      {/* Phần còn lại của form */}
    </form>
  );
};

export default TestPage;
