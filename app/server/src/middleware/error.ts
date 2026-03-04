import { NextFunction, Request, Response } from "express";

/**
 * Central error handler — ensures all unhandled errors return a consistent
 * JSON shape instead of leaking stack traces or returning HTML error pages.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const message =
    err instanceof Error ? err.message : "An unexpected error occurred";

  const status =
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    typeof (err as { status: unknown }).status === "number"
      ? (err as { status: number }).status
      : 500;

  res.status(status).json({ error: message, status });
}
