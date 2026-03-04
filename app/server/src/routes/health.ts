import { Router } from "express";

/**
 * Health check route — HTTP layer only. Exists so load balancers, uptime
 * monitors, and the React client can verify the server is reachable without
 * hitting any business logic or database.
 */
export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});
