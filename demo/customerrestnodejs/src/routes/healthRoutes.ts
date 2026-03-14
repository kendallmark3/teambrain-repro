import { Router, Request, Response } from 'express';

/** Health check route — used by load balancers and monitors to verify the service is alive. */
const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

export default router;
