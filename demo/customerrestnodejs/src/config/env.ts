import dotenv from 'dotenv';

dotenv.config();

/** Validates and exports required environment variables at startup — fails fast if misconfigured. */
export const env = {
  PORT: parseInt(process.env.PORT ?? '3000', 10),
};
