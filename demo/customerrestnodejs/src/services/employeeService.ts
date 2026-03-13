import { EmployeeDTO } from '../dtos/employeeDto';
import { Employee } from '../models/employee';
import { employeeRepository } from '../repositories/employeeRepository';

/** Maps internal Employee model to the public DTO — keeps API contract decoupled from domain model. */
function toDTO(employee: Employee): EmployeeDTO {
  return {
    id: employee.id,
    name: employee.name,
    title: employee.title,
    department: employee.department,
    skillsets: employee.skillsets,
  };
}

/** Orchestrates business logic for employee queries and DTO mapping. */
export const employeeService = {
  getAllEmployees(): EmployeeDTO[] {
    return employeeRepository.findAll().map(toDTO);
  },

  getEmployeeById(id: string): EmployeeDTO | null {
    const employee = employeeRepository.findById(id);
    return employee ? toDTO(employee) : null;
  },
};
