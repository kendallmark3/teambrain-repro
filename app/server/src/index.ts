import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.js";
import { healthRouter } from "./routes/health.js";

const app = express();

app.use(express.json());

/**
 * CORS is scoped to the Vite dev server origin in development.
 * In production the proxy or a reverse-nginx layer handles origin policy,
 * so we restrict here to avoid an open-CORS footgun.
 */
app.use(
  cors({
    origin:
      env.NODE_ENV === "production" ? false : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/health", healthRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
});
