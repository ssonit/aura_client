import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_DOMAIN: z.string(),
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Value in file .env invalid");
}

const envConfig = configProject.data;

export default envConfig;
