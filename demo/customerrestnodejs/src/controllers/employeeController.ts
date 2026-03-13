import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services/employeeService';

/** Handles HTTP concerns only — delegates all logic to the service layer. */
export const employeeController = {
  getAll(req: Request, res: Response, next: NextFunction): void {
    try {
      const employees = employeeService.getAllEmployees();
      res.json(employees);
    } catch (err) {
      next(err);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      const employee = employeeService.getEmployeeById(id);
      if (!employee) {
        res.status(404).json({ error: `Employee with id '${id}' not found` });
        return;
      }
      res.json(employee);
    } catch (err) {
      next(err);
    }
  },
};
