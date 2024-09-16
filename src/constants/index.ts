import envConfig from "@/config";

export const BASE_URL = envConfig.NEXT_PUBLIC_API_ENDPOINT;

export enum Tab {
  Created = "_created",
  Saved = "_saved",
}

export const BoardType = {
  AllPins: "all_pins",
  Custom: "custom",
};
