"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const employeeRepository_1 = require("../repositories/employeeRepository");
/** Maps internal Employee model to the public DTO — keeps API contract decoupled from domain model. */
function toDTO(employee) {
    return {
        id: employee.id,
        name: employee.name,
        title: employee.title,
        department: employee.department,
        skillsets: employee.skillsets,
    };
}
/** Orchestrates business logic for employee queries and DTO mapping. */
exports.employeeService = {
    getAllEmployees() {
        return employeeRepository_1.employeeRepository.findAll().map(toDTO);
    },
    getEmployeeById(id) {
        const employee = employeeRepository_1.employeeRepository.findById(id);
        return employee ? toDTO(employee) : null;
    },
};
