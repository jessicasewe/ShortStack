import rateLimit from "express-rate-limit";

export function rateLimiter() {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: "error",
      code: 429,
      message: "Too many requests, please try again later",
    },
  });
}
