import envConfig from "@/config";

export const BASE_URL = envConfig.NEXT_PUBLIC_API_ENDPOINT;

export enum Tab {
  Created = "_created",
  Saved = "_saved",
}

export const BoardType = {
  AllPins: "all_pins",
  Custom: "custom",
} as const;

export const MasonryType = {
  Home: "home",
  Search: "search",
} as const;

export const SortType = {
  Asc: "asc",
  Desc: "desc",
} as const;
