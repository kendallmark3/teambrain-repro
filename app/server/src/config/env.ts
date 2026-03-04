import { z } from "zod";

/**
 * Validates required environment variables at startup so misconfiguration
 * fails fast and loudly rather than at the point of first use.
 */
const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .default("3001")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0 && val < 65536, {
      message: "PORT must be a valid port number (1–65535)",
    }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
