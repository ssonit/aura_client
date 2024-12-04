"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const prompts = [
  "Ultra-detailed, high-quality, stunning masterpiece, long silver hair, violet eyes, anime style, dynamic pose, original character, full-body portrait, intricate outfit design, glowing background, digital painting.",
  "Vibrant and detailed, cinematic masterpiece, short pink hair, golden eyes, anime style, full-body character, dynamic lighting, fantasy warrior outfit, magical aura, standing in a mystical forest, digital illustration.",
  "best quality, masterpiece, black hair, blue eyes, anime style, full body, original character, digital art",
  "Ultra-detailed, radiant masterpiece, wavy pastel pink hair, golden hazel eyes, anime style, full-body depiction, chic streetwear with headphones, walking through a rain-soaked city lit by colorful reflections, digital illustration.",
  "Hyper-realistic, colorful masterpiece, sleek turquoise hair, glowing orange eyes, anime style, full-body dynamic pose, futuristic ninja outfit with holographic weapons, leaping between neon-lit skyscrapers, digital artwork.",
];

export default function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setImageUrl("");
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.arrayBuffer();

      const blob = new Blob([data], { type: "image/jpeg" });

      const imageUrl = URL.createObjectURL(blob);

      setImageUrl(imageUrl);
    } catch (error) {
      setError(
        "An error occurred while generating the image. Please try again."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) {
      setError("No image to download");
      return;
    }

    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "generated-image.png";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    //   URL.revokeObjectURL(imageUrl);
  };

  const handlePromptSelect = (value: string) => {
    setPrompt(value);
  };

  return (
    <div className="max-w-lg mx-auto my-10">
      <h1 className="text-center my-10 text-4xl">AI Image Generation Tool</h1>
      <Select onValueChange={handlePromptSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a predefined prompt" />
        </SelectTrigger>
        <SelectContent className="max-w-lg">
          {prompts.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex space-x-2 mt-8 mb-4 items-center">
        <Input
          type="text"
          placeholder="Enter your image description"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
        />
        <Button
          onClick={generateImage}
          className="w-24"
          disabled={loading || !prompt}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
        </Button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Generated Image"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <Button onClick={downloadImage} className="w-full">
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
}
