import { Router } from 'express';
import { employeeController } from '../controllers/employeeController';

/** Routes file is HTTP-only — no business logic, just wiring paths to controllers. */
const router = Router();

router.get('/', employeeController.getAll);
router.get('/:id', employeeController.getById);

export default router;
