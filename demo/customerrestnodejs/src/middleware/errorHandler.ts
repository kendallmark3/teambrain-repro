import { Request, Response, NextFunction } from 'express';

/** Centralized error handler — prevents unhandled exceptions from leaking stack traces to clients. */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  console.error('[ErrorHandler]', err.message);
  res.status(500).json({ error: 'Internal server error' });
}
