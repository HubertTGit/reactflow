import { Redis } from "@upstash/redis";

const entry = (): { url: string; token: string } => {
  if (process.env.REDIS_URL && process.env.REDIS_TOKEN) {
    return {
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    };
  }
  throw new Error("REDIS_URL is not defined");
};

export const redis = new Redis(entry());
