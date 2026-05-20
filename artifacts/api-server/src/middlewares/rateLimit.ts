import type { RequestHandler } from "express";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 3 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, RateLimitEntry>();

function getClientKey(req: Parameters<RequestHandler>[0]) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

export const formSubmissionRateLimit: RequestHandler = (req, res, next) => {
  const now = Date.now();
  const key = getClientKey(req);
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    next();
    return;
  }

  if (current.count >= MAX_REQUESTS) {
    res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
    return;
  }

  current.count += 1;
  next();
};
