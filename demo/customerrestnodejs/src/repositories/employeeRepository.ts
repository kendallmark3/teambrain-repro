import { Employee } from '../models/employee';
import { mockEmployees } from '../data/mockEmployees';

/** Abstracts data access — swap mock data for a real DB here without touching service or controller layers. */
export const employeeRepository = {
  findAll(): Employee[] {
    return mockEmployees;
  },

  findById(id: string): Employee | undefined {
    return mockEmployees.find((e) => e.id === id);
  },
};
