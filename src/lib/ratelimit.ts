import {Ratelimit} from "@upstash/ratelimit";
import { redis } from "./redis";

export const ratelimit = new Ratelimit({
  redis, 
  limiter: Ratelimit.fixedWindow(10, "10 s"), // 10 requests per 10 seconds
  // analytics: true,
})
